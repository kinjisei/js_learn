import { getReviews, createReview, deleteReview } from './api.js';
import { renderReviews, renderAverage, renderCounter, renderStatus } from './render.js';

const form = document.querySelector('#review-form');
const submitButton = document.querySelector('#submit-button');
const reviewList = document.querySelector('#review-list');
const average = document.querySelector('#average');
const counter = document.querySelector('#counter');
const ratingFilter = document.querySelector('#rating-filter');
const searchInput = document.querySelector('#search');

let allReviews = [];

form.addEventListener('submit', handleSubmit);
ratingFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);
reviewList.addEventListener('click', handleListClick);

loadReviews();

async function loadReviews() {
  try {
    allReviews = await getReviews();
    applyFilters();
  } catch (error) {
    console.error(error);
    renderStatus(reviewList, 'Не удалось загрузить отзывы. Попробуйте обновить страницу.');
  }
}

function applyFilters() {
  const rating = ratingFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = allReviews
    .filter((review) => rating === 'all' || Number(review.rating) === Number(rating))
    .filter((review) => review.name.toLowerCase().includes(query));

  const isFiltering = rating !== 'all' || query !== '';
  const emptyText = isFiltering ? 'Нет отзывов с такой оценкой' : 'Пока нет отзывов';

  renderReviews(reviewList, filtered, emptyText);
  renderCounter(counter, filtered.length, allReviews.length);
  renderAverage(average, allReviews);
}

async function handleSubmit(event) {
  event.preventDefault();

  const review = {
    name: form.elements.name.value.trim(),
    text: form.elements.text.value.trim(),
    rating: Number(form.elements.rating.value),
  };

  if (!review.name || !review.text) {
    alert('Заполните имя и текст отзыва');
    return;
  }

  submitButton.disabled = true;
  try {
    await createReview(review);
    await loadReviews();
    form.reset();
  } catch (error) {
    console.error(error);
    alert('Не удалось отправить отзыв. Попробуйте ещё раз.');
  } finally {
    submitButton.disabled = false;
  }
}

async function handleListClick(event) {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button) return;

  const id = button.closest('[data-id]').dataset.id;
  if (!confirm('Удалить этот отзыв?')) return;

  button.disabled = true;
  try {
    await deleteReview(id);
    await loadReviews();
  } catch (error) {
    console.error(error);
    alert('Не удалось удалить отзыв. Попробуйте ещё раз.');
    button.disabled = false;
  }
}
