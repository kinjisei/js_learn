import * as store from '../store.js';
import { cloneTemplate, findById, renderMedia, renderStatus, showNotice } from '../dom.js';
import { getErrorMessage } from '../errors.js';
import { formatPrice, pluralize } from '../format.js';

const elements = {
  status: document.querySelector('#status'),
  content: document.querySelector('#cart-content'),
  empty: document.querySelector('#cart-empty'),
  list: document.querySelector('#cart-list'),
  summaryCount: document.querySelector('#summary-count'),
  summaryTotal: document.querySelector('#summary-total'),
  clearButton: document.querySelector('#clear-cart'),
  cartCount: document.querySelector('#cart-count'),
  itemTemplate: document.querySelector('#cart-item-template'),
};

// Какая кнопка какую операцию вызывает. Новая кнопка = новая строка здесь
// и data-action в разметке, без нового if/else.
const actions = {
  increase: store.addToCart,
  decrease: store.removeOneFromCart,
  remove: store.removeFromCart,
};

const pending = new Set(); // id товаров, по которым идёт запрос
let isClearing = false;

elements.list.addEventListener('click', handleListClick);
elements.clearButton.addEventListener('click', handleClear);

loadPage();

async function loadPage() {
  elements.content.hidden = true;
  elements.empty.hidden = true;
  renderStatus(elements.status, 'Загружаем корзину…');
  try {
    await store.load();
  } catch (error) {
    renderStatus(elements.status, getErrorMessage(error), loadPage);
    return;
  }
  renderStatus(elements.status, '');
  renderCart();
}

/* ---------- Отрисовка ---------- */

function renderCart() {
  elements.list.replaceChildren(...store.getCartItems().map(createCartRow));
  renderSummary();
}

function createCartRow({ productId }) {
  const product = store.getProduct(productId);
  const { root, refs } = cloneTemplate(elements.itemTemplate);
  root.dataset.id = productId;
  renderMedia(refs.media, product);
  refs.title.textContent = product.title;
  refs.price.textContent = `${formatPrice(product.price)} за шт.`;
  updateCartRow(root, productId);
  return root;
}

/** Обновляет только изменяемые части строки: количество, сумму, кнопки. */
function updateCartRow(row, productId) {
  const product = store.getProduct(productId);
  const count = store.getCountInCart(productId);
  const isBusy = pending.has(productId) || isClearing;

  row.querySelector('[data-ref="count"]').textContent = count;
  row.querySelector('[data-ref="total"]').textContent = formatPrice(product.price * count);
  row.querySelector('[data-ref="stock-hint"]').hidden = product.stock > 0;
  row.querySelector('[data-action="increase"]').disabled = product.stock === 0;

  row.classList.toggle('is-busy', isBusy);
  row.setAttribute('aria-busy', String(isBusy));
  for (const button of row.querySelectorAll('[data-action]')) {
    button.setAttribute('aria-disabled', String(isBusy));
  }
}

function renderSummary() {
  const { count, total } = store.getCartSummary();
  const isEmpty = count === 0;

  elements.content.hidden = isEmpty;
  elements.empty.hidden = !isEmpty;
  elements.cartCount.textContent = count;
  elements.summaryCount.textContent = pluralize(count, ['товар', 'товара', 'товаров']);
  elements.summaryTotal.textContent = formatPrice(total);
  elements.clearButton.setAttribute('aria-disabled', String(isClearing));
  elements.clearButton.textContent = isClearing ? 'Очищаем…' : 'Очистить корзину';
}

/* ---------- Действия ---------- */

async function handleListClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;

  const row = button.closest('[data-id]');
  const productId = row.dataset.id;
  if (pending.has(productId) || isClearing) return;

  pending.add(productId);
  updateCartRow(row, productId);

  try {
    await actions[button.dataset.action](productId);
  } catch (error) {
    showNotice(getErrorMessage(error), 'error');
  } finally {
    pending.delete(productId);
    if (store.getCountInCart(productId) === 0) {
      row.remove();
    } else {
      updateCartRow(row, productId);
    }
    renderSummary();
  }
}

async function handleClear() {
  if (isClearing || !confirm('Удалить все товары из корзины?')) return;

  isClearing = true;
  for (const { productId } of store.getCartItems()) {
    updateCartRow(findById(elements.list, productId), productId);
  }
  renderSummary();

  try {
    await store.clearCart();
    showNotice('Корзина очищена', 'success');
  } catch (error) {
    showNotice(getErrorMessage(error), 'error');
  } finally {
    isClearing = false;
    renderCart();
  }
}
