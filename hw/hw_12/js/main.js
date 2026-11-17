import { getReviews, createReview } from './api.js';
import { renderReviews, renderAverage, renderStatus } from './render.js';

const form = document.querySelector('#review-form');
const submitButton = document.querySelector('#submit-button');
const reviewList = document.querySelector('#review-list');
const average = document.querySelector('#average');

form.addEventListener('submit', handleSubmit);

loadReviews();

async function loadReviews() {
  try {
    const reviews = await getReviews();
    renderReviews(reviewList, reviews);
    renderAverage(average, reviews);
  } catch (error) {
    console.error(error);
    renderStatus(reviewList, 'Не удалось загрузить отзывы. Попробуйте обновить страницу.');
  }
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
