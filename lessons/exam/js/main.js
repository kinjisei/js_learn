import { getGames, updateGame, deleteGame, createGame } from './api.js';
import { renderGames, renderMessage } from './ui.js';
import { getTheme, saveTheme } from './storage.js';
import { GENRES, MIN_YEAR, MAX_YEAR, MIN_RATING, MAX_RATING } from './config.js';

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
const submitButton = document.querySelector('#submit-button');
const themeToggle = document.querySelector('#theme-toggle');

let games = [];
let editingId = null;

function fillGenres() {
    GENRES.forEach(name => {
        genre.append(new Option(name, name));
        genreFilter.append(new Option(name, name));
    });
}

function setLimits() {
    year.min = MIN_YEAR;
    year.max = MAX_YEAR;
    rating.min = MIN_RATING;
    rating.max = MAX_RATING;
}

function showMessage(text, isError = true) {
    message.textContent = text;
    message.classList.toggle('form-message--error', isError);
}

function clearMessage() {
    showMessage('');
}

function validate(data) {
    if (!data.title || !data.genre || data.year === '' || data.rating === '' || !data.description) {
        return 'Все поля должны быть заполнены!';
    }
    const yearValue = Number(data.year);
    const ratingValue = Number(data.rating);
    if (Number.isNaN(ratingValue) || ratingValue < MIN_RATING || ratingValue > MAX_RATING) {
        return `Рейтинг должен быть от ${MIN_RATING} до ${MAX_RATING}`;
    }
    if (!Number.isInteger(yearValue) || yearValue < MIN_YEAR || yearValue > MAX_YEAR) {
        return `Год выпуска должен быть целым числом от ${MIN_YEAR} до ${MAX_YEAR}`;
    }
    return '';
}

function render() {
    const selected = genreFilter.value;
    const searched = search.value.trim().toLowerCase();

    const filtered = games.filter(game => {
        const matchesGenre = selected === 'all' || game.genre === selected;
        const matchesTitle = game.title.toLowerCase().includes(searched);
        const matchesFavorite = !favoritesOnly.checked || game.favorite;
        return matchesGenre && matchesTitle && matchesFavorite;
    });

    counter.textContent = `Показано: ${filtered.length} из ${games.length}`;

    const emptyText = games.length === 0 ? 'Тут пока пусто...' : 'По вашему запросу ничего не найдено';
    renderGames(filtered, editingId, emptyText);
}

async function loadGames() {
    renderMessage('Загрузка...');
    try {
        games = await getGames();
        render();
    } catch (error) {
        counter.textContent = '';
        renderMessage(`Не удалось загрузить игры. ${error.message}`, true);
    }
}

async function addNewGame(event) {
    event.preventDefault();

    const game = {
        title: title.value.trim(),
        genre: genre.value,
        year: year.value,
        rating: rating.value,
        description: description.value.trim()
    };

    const error = validate(game);
    if (error) {
        showMessage(error);
        return;
    }

    submitButton.disabled = true;
    try {
        const created = await createGame({
            ...game,
            year: Number(game.year),
            rating: Number(game.rating),
            favorite: false
        });
        games.push(created);
        gameForm.reset();
        showMessage('Игра добавлена', false);
        render();
    } catch (err) {
        showMessage(`Не удалось добавить игру. ${err.message}`);
    } finally {
        submitButton.disabled = false;
    }
}

function readEditForm(card) {
    return {
        title: card.querySelector('.editTitle').value.trim(),
        genre: card.querySelector('.editGenre').value,
        year: card.querySelector('.editYear').value,
        rating: card.querySelector('.editRating').value,
        description: card.querySelector('.editDescription').value.trim()
    };
}

async function handleAction(action, id, card) {
    const game = games.find(item => item.id === id);

    if (action === 'delete') {
        await deleteGame(id);
        games = games.filter(item => item.id !== id);
        if (editingId === id) editingId = null;
    }

    if (action === 'favorite') {
        const saved = await updateGame(id, { ...game, favorite: !game.favorite });
        games = games.map(item => item.id === id ? saved : item);
    }

    if (action === 'edit') {
        editingId = id;
    }

    if (action === 'cancel') {
        editingId = null;
    }

    if (action === 'save') {
        const edited = readEditForm(card);
        const error = validate(edited);
        if (error) {
            card.querySelector('.field__error').textContent = error;
            return false;
        }

        const saved = await updateGame(id, {
            ...game,
            ...edited,
            year: Number(edited.year),
            rating: Number(edited.rating)
        });
        games = games.map(item => item.id === id ? saved : item);
        editingId = null;
    }

    return true;
}

async function onListClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const card = button.closest('.game-card');
    button.disabled = true;

    try {
        const changed = await handleAction(button.dataset.action, card.dataset.id, card);
        if (changed) render();
    } catch (error) {
        const errorBox = card.querySelector('.field__error');
        if (errorBox) {
            errorBox.textContent = error.message;
        } else {
            showMessage(error.message);
        }
    } finally {
        button.disabled = false;
    }
}

function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeToggle.textContent = dark ? 'Светлая тема' : 'Тёмная тема';
}

function toggleTheme() {
    const dark = !document.body.classList.contains('dark');
    saveTheme(dark ? 'dark' : 'light');
    applyTheme(dark);
}

[title, year, rating, description].forEach(control => control.addEventListener('input', clearMessage));
genre.addEventListener('change', clearMessage);
gameForm.addEventListener('submit', addNewGame);
search.addEventListener('input', render);
genreFilter.addEventListener('change', render);
favoritesOnly.addEventListener('change', render);
gameList.addEventListener('click', onListClick);
themeToggle.addEventListener('click', toggleTheme);

fillGenres();
setLimits();
applyTheme(getTheme() === 'dark');
loadGames();
