// emptyText — что показать, если список пуст (зависит от того, фильтруем мы или нет)
export function renderReviews(container, reviews, emptyText = 'Пока нет отзывов') {
  if (reviews.length === 0) {
    container.replaceChildren(createStatus(emptyText));
    return;
  }

  const cards = [...reviews].reverse().map(createReviewCard);
  container.replaceChildren(...cards);
}

export function renderCounter(element, shown, total) {
  element.textContent = shown === total
    ? `Всего отзывов: ${total}`
    : `Показано: ${shown} из ${total}`;
}

function createReviewCard(review) {
  const card = document.createElement('article');
  card.className = 'review';

  const head = document.createElement('div');
  head.className = 'review__head';

  const name = document.createElement('h3');
  name.className = 'review__name';
  name.textContent = review.name;

  const rating = document.createElement('span');
  rating.className = 'review__rating';
  rating.textContent = stars(review.rating);
  rating.title = `Оценка: ${review.rating} из 5`;

  head.append(name, rating);

  const text = document.createElement('p');
  text.className = 'review__text';
  text.textContent = review.text;

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'button button--danger';
  remove.dataset.action = 'delete';
  remove.textContent = 'Удалить';

  card.dataset.id = review.id;
  card.append(head, text, remove);
  return card;
}

export function renderAverage(element, reviews) {
  if (reviews.length === 0) {
    element.hidden = true;
    return;
  }
  const sum = reviews.reduce((total, review) => total + Number(review.rating), 0);
  const average = (sum / reviews.length).toFixed(1);
  element.textContent = `Средняя оценка: ${average} из 5 (отзывов: ${reviews.length})`;
  element.hidden = false;
}

export function renderStatus(container, text) {
  container.replaceChildren(createStatus(text));
}

function createStatus(text) {
  const status = document.createElement('p');
  status.className = 'list-status';
  status.textContent = text;
  return status;
}

function stars(rating) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  return '★'.repeat(value) + '☆'.repeat(5 - value);
}
