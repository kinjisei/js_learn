import { API_URL, CART_ID, REQUEST_TIMEOUT_MS } from './config.js';
import { ApiError } from './errors.js';

/*
 * Единственный файл, который знает, как устроен сервер:
 * адреса, HTTP-методы и названия полей (quantity, carts).
 * Остальной код работает с понятными именами (stock, productId).
 * Если сервер поменяется, править придётся только здесь.
 */

/**
 * Общая обёртка над fetch: таймаут, проверка статуса, разбор JSON
 * и понятные сообщения об ошибках.
 */
async function request(path, { method = 'GET', body } = {}) {
  const options = {
    method,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  };

  if (body !== undefined) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}/${path}`, options);
  } catch (error) {
    // fetch падает, только если ответа не было вообще: нет сети или сработал таймаут
    const message = error.name === 'TimeoutError'
      ? 'Сервер не отвечает. Попробуйте ещё раз.'
      : 'Нет соединения с сервером. Проверьте интернет.';
    throw new ApiError(message, { cause: error });
  }

  // 404, 500 и т.п. — fetch НЕ считает ошибкой, проверяем сами
  if (!response.ok) {
    throw new ApiError(`Сервер вернул ошибку ${response.status}. Попробуйте позже.`, {
      status: response.status,
    });
  }

  return response.json();
}

/* ---------- Преобразование данных сервера в формат приложения ---------- */

function toProduct(raw) {
  return {
    id: String(raw.id),
    title: raw.title ?? 'Без названия',
    description: raw.description ?? '',
    category: raw.category || 'Без категории',
    price: Number(raw.price) || 0,
    // На сервере поле называется quantity. В приложении — stock (остаток на складе),
    // чтобы его нельзя было спутать с count (сколько штук лежит в корзине).
    stock: Math.max(0, Number(raw.quantity) || 0),
    picture: raw.picture ?? '',
  };
}

/*
 * Раньше в корзину сохранялась полная копия товара: { id, title, price, quantity, count }.
 * Теперь сохраняем только ссылку на товар и количество: { productId, count }.
 * Название, цену и остаток всегда берём из актуального списка товаров.
 * Читаем оба формата, чтобы старые данные на сервере не сломали страницу.
 */
function toCartItem(raw) {
  return {
    productId: String(raw.productId ?? raw.id),
    count: Number(raw.count) || 0,
  };
}

/* ---------- Публичные функции ---------- */

export async function fetchProducts() {
  const data = await request('products');
  return data.map(toProduct);
}

export async function fetchCartItems() {
  const cart = await request(`carts/${CART_ID}`);
  return (cart.carts ?? []).map(toCartItem).filter((item) => item.count > 0);
}

export async function saveCartItems(items) {
  await request(`carts/${CART_ID}`, { method: 'PUT', body: { carts: items } });
}

export async function updateProductStock(productId, stock) {
  await request(`products/${productId}`, { method: 'PUT', body: { quantity: stock } });
}
