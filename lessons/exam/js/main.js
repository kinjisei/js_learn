import { getGames, updateGame, deleteGame, createGame } from './api.js';
import { renderGames } from './ui.js'
import { getTheme, saveTheme } from './storage.js';

const title = document.querySelector('#title');
const gameForm = document.querySelector('#game-form');
const genre = document.querySelector('#genre');
const year = document.querySelector('#year');
const rating = document.querySelector('#rating');
const description = document.querySelector('#description');
const search = document.querySelector('#search');
const genreFilter = document.querySelector('#genre-filter');
const favoritesOnly = document.querySelector('#favorites-only');
const counter = document.querySelector('#counter');
const gameList = document.querySelector('#game-list');
const message = document.querySelector('#message');
const themeToggle = document.querySelector('#theme-toggle');

const MIN_YEAR = 1970;
const MAX_YEAR = 2027;

let games = [];
let editingId = null;

gameForm.addEventListener('submit', addNewGame);
search.addEventListener('input', render);
genreFilter.addEventListener('change', render);
favoritesOnly.addEventListener('change', render);
title.addEventListener('input', clearMessage);
genre.addEventListener('change', clearMessage);
year.addEventListener('input', clearMessage);
description.addEventListener('input', clearMessage);
rating.addEventListener('input', clearMessage);
themeToggle.addEventListener('click', toggleTheme);

async function loadGames() {
    games = await getGames();
    render();
}

loadGames();
initTheme();

function clearMessage() {
    message.textContent = '';
}

function validate(data) {
    if (!data.title || !data.genre || data.year === '' || data.rating === '' || !data.description) {
        return 'Все поля должны быть заполнены!';
    }
    if (data.rating < 0 || data.rating > 10) {
        return 'Рейтинг должен быть от 0 до 10';
    }
    if (data.year < MIN_YEAR || data.year > MAX_YEAR) {
        return `Год выпуска должен быть от ${MIN_YEAR} до ${MAX_YEAR}`;
    }
    return '';
}

async function addNewGame(event) {
    event.preventDefault();

    const game = {
        title: title.value.trim(),
        genre: genre.value.trim(),
        year: year.value,
        rating: rating.value,
        description: description.value.trim()
    };

    const error = validate(game);
    if (error) {
        message.textContent = error;
        return;
    }

    game.year = Number(game.year);
    game.rating = Number(game.rating);
    game.favorite = false;

    const created = await createGame(game);
    games.push(created);
    gameForm.reset();
    clearMessage();
    render();
}

function render() {
    const selected = genreFilter.value;
    const searched = search.value.trim().toLowerCase();

    const filtered = games.filter(game => {
        return (selected === 'all' || game.genre === selected) && game.title.toLowerCase().includes(searched) && (!favoritesOnly.checked || game.favorite);
    });

    counter.textContent = `Показано: ${filtered.length} из ${games.length}`;

    const emptyText = games.length === 0 ? 'Тут пока пусто...' : 'По вашему запросу ничего не найдено';
    renderGames(filtered, editingId, emptyText);
}

gameList.addEventListener('click', async (event) => {
    const btn = event.target.closest('button[data-action]');
    if (!btn) return;

    const card = btn.closest('.game');
    const id = card.dataset.id;
    const action = btn.dataset.action;

    if (action === 'delete') {
        await deleteGame(id);
        games = games.filter(g => g.id !== id);
        if (editingId === id) editingId = null;
    }

    if (action === 'favorite') {
        const game = games.find(g => g.id === id);
        const saved = await updateGame(id, { ...game, favorite: !game.favorite });
        games = games.map(g => g.id === id ? saved : g);
    }

    if (action === 'edit') {
        editingId = id;
    }

    if (action === 'cancel') {
        editingId = null;
        clearMessage();
    }

    if (action === 'save') {
        const edited = {
            title: card.querySelector('.editTitle').value.trim(),
            genre: card.querySelector('.editGenre').value.trim(),
            year: card.querySelector('.editYear').value,
            rating: card.querySelector('.editRating').value,
            description: card.querySelector('.editDescription').value.trim()
        };

        const error = validate(edited);
        if (error) {
            message.textContent = error;
            return;
        }

        const updated = {
            ...games.find(g => g.id === id),
            ...edited,
            year: Number(edited.year),
            rating: Number(edited.rating)
        };

        const saved = await updateGame(id, updated);
        games = games.map(g => g.id === id ? saved : g);
        editingId = null;
        clearMessage();
    }

    render();
});

function initTheme() {
    applyTheme(getTheme() === 'dark');
}

function toggleTheme() {
    const dark = !document.body.classList.contains('dark');
    saveTheme(dark ? 'dark' : 'light');
    applyTheme(dark);
}

function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeToggle.textContent = dark ? 'Светлая тема' : 'Тёмная тема';
}
