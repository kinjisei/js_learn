const BASE_URL = 'https://6af4b53f55a1de7dcf0462a4.mockapi.io/reviews';

export async function getReviews() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  return response.json();
}

export async function createReview(review) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  return response.json();
}
