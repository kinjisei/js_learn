import * as store from '../store.js';
import { cloneTemplate, findById, renderMedia, renderStatus, showNotice } from '../dom.js';
import { getErrorMessage } from '../errors.js';
import { formatPrice } from '../format.js';

const elements = {
  filters: document.querySelector('#filters'),
  search: document.querySelector('#search'),
  category: document.querySelector('#category'),
  status: document.querySelector('#status'),
  list: document.querySelector('#product-list'),
  cartCount: document.querySelector('#cart-count'),
  cardTemplate: document.querySelector('#product-card-template'),
};

// id товаров, для которых сейчас идёт запрос. Защищает от двойного клика.
const pending = new Set();

elements.filters.addEventListener('submit', (event) => event.preventDefault());
elements.filters.addEventListener('input', renderProducts); // и поиск, и select
elements.list.addEventListener('click', handleListClick);

loadPage();

async function loadPage() {
  renderStatus(elements.status, 'Загружаем товары…');
  try {
    await store.load();
  } catch (error) {
    renderStatus(elements.status, getErrorMessage(error), loadPage);
    return;
  }
  renderCategories();
  renderProducts();
  renderCartCount();
}

/* ---------- Отрисовка ---------- */

function renderCategories() {
  const categories = store.getCategories();
  const selected = elements.category.value;

  elements.category.replaceChildren(
    new Option('Все категории', 'all'),
    ...categories.map((category) => new Option(category, category)),
  );
  elements.category.value = categories.includes(selected) ? selected : 'all';
}

function getVisibleProducts() {
  const query = elements.search.value.trim().toLowerCase();
  const category = elements.category.value;

  return store.getProducts().filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesQuery = product.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

/** Полная перерисовка списка — только при загрузке и смене фильтров. */
function renderProducts() {
  const visible = getVisibleProducts();
  elements.list.replaceChildren(...visible.map(createProductCard));
  renderStatus(elements.status, visible.length ? '' : 'Ничего не нашлось. Попробуйте изменить запрос или категорию.');
}

/** Создаёт карточку и заполняет то, что не меняется: название, цену, картинку. */
function createProductCard(product) {
  const { root, refs } = cloneTemplate(elements.cardTemplate);
  root.dataset.id = product.id;
  renderMedia(refs.media, product);
  refs.category.textContent = product.category;
  refs.title.textContent = product.title;
  refs.description.textContent = product.description;
  refs.price.textContent = formatPrice(product.price);
  updateProductCard(root, product);
  return root;
}

/**
 * Обновляет то, что меняется после клика: остаток, «в корзине», кнопку.
 * Карточку не пересоздаём, поэтому фокус клавиатуры остаётся на кнопке.
 */
function updateProductCard(card, product) {
  const stock = card.querySelector('[data-ref="stock"]');
  const inCart = card.querySelector('[data-ref="in-cart"]');
  const button = card.querySelector('[data-action="add"]');

  const countInCart = store.getCountInCart(product.id);
  const isPending = pending.has(product.id);
  const isSoldOut = product.stock === 0;

  card.classList.toggle('is-sold-out', isSoldOut);
  stock.textContent = isSoldOut ? 'Нет в наличии' : `В наличии: ${product.stock} шт.`;
  inCart.hidden = countInCart === 0;
  inCart.textContent = `В корзине: ${countInCart}`;

  button.disabled = isSoldOut && !isPending;
  // Во время запроса используем aria-disabled, а не disabled:
  // disabled сбросил бы фокус с кнопки, а скринридер всё равно узнает, что она недоступна
  button.setAttribute('aria-disabled', String(isPending));
  button.textContent = isPending ? 'Добавляем…' : 'В корзину';
}

function refreshProductCard(productId) {
  const card = findById(elements.list, productId);
  if (card) updateProductCard(card, store.getProduct(productId));
}

function renderCartCount() {
  const { count } = store.getCartSummary();
  elements.cartCount.textContent = count;
}

/* ---------- Действия ---------- */

async function handleListClick(event) {
  const button = event.target.closest('[data-action="add"]');
  if (!button) return;

  const productId = button.closest('[data-id]').dataset.id;
  if (pending.has(productId)) return;

  pending.add(productId);
  refreshProductCard(productId);

  try {
    await store.addToCart(productId);
    showNotice(`«${store.getProduct(productId).title}» в корзине`, 'success');
  } catch (error) {
    showNotice(getErrorMessage(error), 'error');
  } finally {
    pending.delete(productId);
    refreshProductCard(productId);
    renderCartCount();
  }
}
