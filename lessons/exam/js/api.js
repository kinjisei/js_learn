const BASE_URL = 'https://6af4b53f55a1de7dcf0462a4.mockapi.io/games';

async function request(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
    }
    return response.json();
}

export async function getGames() {
    return request(BASE_URL);
}

export async function createGame(game) {
    return request(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    });
}

export async function updateGame(id, game) {
    return request(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    });
}

export async function deleteGame(id) {
    return request(`${BASE_URL}/${id}`, {method: 'DELETE'});
}