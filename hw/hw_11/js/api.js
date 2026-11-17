const BASE_URL = 'https://6af4b53f55a1de7dcf0462a4.mockapi.io/posts';


async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  return response.json();
}

export async function getPosts() {
  return request(BASE_URL);
}

export async function createPost(post) {
  return request(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
}

export async function updatePost(id, post) {
  return request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
}

export async function deletePost(id) {
  return request(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
