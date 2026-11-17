import * as api from './api.js';
import { AppError } from './errors.js';

/*
 * Состояние магазина: список товаров и содержимое корзины.
 * Это единственный источник правды для обеих страниц. Страницы только
 * читают данные отсюда и вызывают операции, но не меняют массивы сами.
 *
 * Модель «резерва», как задумано на курсе: товар в корзине сразу
 * списывается со склада (products.quantity), а при удалении возвращается.
 *
 * Правило для всех операций: сначала сервер, потом локальное состояние.
 * Если запрос упал, локальные данные не меняются и экран не врёт.
 */

let products = [];
let cartItems = []; // [{ productId, count }]

/* ---------- Чтение ---------- */

export function getProducts() {
  return products;
}

export function getCartItems() {
  return cartItems;
}

export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

export function getCountInCart(productId) {
  return cartItems.find((item) => item.productId === productId)?.count ?? 0;
}

export function getCategories() {
  const unique = new Set(products.map((product) => product.category));
  return [...unique].sort((a, b) => a.localeCompare(b, 'ru'));
}

export function getCartSummary() {
  let count = 0;
  let total = 0;
  for (const item of cartItems) {
    count += item.count;
    total += getProduct(item.productId).price * item.count;
  }
  return { count, total };
}

/* ---------- Загрузка ---------- */

export async function load() {
  // Два независимых запроса отправляем параллельно, а не по очереди
  const [loadedProducts, loadedItems] = await Promise.all([
    api.fetchProducts(),
    api.fetchCartItems(),
  ]);

  products = loadedProducts;

  // Если товар удалили из каталога, его позиция в корзине больше не нужна
  const existingIds = new Set(products.map((product) => product.id));
  cartItems = loadedItems.filter((item) => existingIds.has(item.productId));
}

/* ---------- Операции с корзиной ---------- */

export function addToCart(productId) {
  return updateCount(productId, (count) => count + 1);
}

export function removeOneFromCart(productId) {
  return updateCount(productId, (count) => count - 1);
}

export function removeFromCart(productId) {
  return updateCount(productId, () => 0);
}

export function clearCart() {
  return enqueue(async () => {
    const removedItems = cartItems;
    if (removedItems.length === 0) return;

    await api.saveCartItems([]);
    cartItems = [];

    // Возвращаем товары на склад параллельно. allSettled ждёт все запросы,
    // даже если какой-то упал, и обновляет остаток только у успешных.
    const results = await Promise.allSettled(
      removedItems.map(async ({ productId, count }) => {
        const nextStock = getProduct(productId).stock + count;
        await api.updateProductStock(productId, nextStock);
        setStock(productId, nextStock);
      }),
    );

    if (results.some((result) => result.status === 'rejected')) {
      throw new AppError('Корзина очищена, но часть товаров не вернулась на склад. Обновите страницу.');
    }
  });
}

/* ---------- Внутренняя кухня ---------- */

/**
 * Меняет количество товара в корзине и остаток на складе.
 * getNextCount получает текущее количество и возвращает новое.
 * Текущее значение читается в момент выполнения, а не в момент клика,
 * поэтому операции из очереди не работают со старыми данными.
 */
function updateCount(productId, getNextCount) {
  return enqueue(async () => {
    const product = getProduct(productId);
    if (!product) {
      throw new AppError('Товар не найден. Обновите страницу.');
    }

    const currentCount = getCountInCart(productId);
    const nextCount = Math.max(0, getNextCount(currentCount));
    const taken = nextCount - currentCount; // > 0 берём со склада, < 0 возвращаем

    if (taken === 0) return;
    if (taken > product.stock) {
      throw new AppError(`«${product.title}» больше нет на складе.`);
    }

    const nextStock = product.stock - taken;
    const nextItems = setItemCount(cartItems, productId, nextCount);

    await api.updateProductStock(productId, nextStock);
    try {
      await api.saveCartItems(nextItems);
    } catch (error) {
      // Остаток уже изменён, а корзина нет. Откатываем остаток, иначе товар
      // «потеряется»: со склада списан, но ни у кого в корзине не лежит.
      await api.updateProductStock(productId, product.stock).catch((rollbackError) => {
        console.error('Не удалось откатить остаток товара', productId, rollbackError);
      });
      throw error;
    }

    setStock(productId, nextStock);
    cartItems = nextItems;
  });
}

/** Чистая функция: возвращает новый массив и не меняет исходный. */
function setItemCount(items, productId, count) {
  if (count === 0) {
    return items.filter((item) => item.productId !== productId);
  }
  const exists = items.some((item) => item.productId === productId);
  if (!exists) {
    return [...items, { productId, count }];
  }
  return items.map((item) => (item.productId === productId ? { ...item, count } : item));
}

function setStock(productId, stock) {
  products = products.map((product) => (product.id === productId ? { ...product, stock } : product));
}

/*
 * Очередь операций. Корзина хранится на сервере одним документом и сохраняется
 * целиком (PUT). Если два запроса уйдут одновременно, второй затрёт первый.
 * Поэтому операции выполняются строго по одной, в порядке кликов.
 */
let queue = Promise.resolve();

function enqueue(task) {
  const result = queue.then(task);
  queue = result.catch(() => {}); // ошибка одной операции не должна блокировать следующие
  return result;
}
