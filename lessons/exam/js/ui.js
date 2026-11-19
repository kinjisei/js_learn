import { GENRES, MIN_YEAR, MAX_YEAR, MIN_RATING, MAX_RATING } from './config.js';

const gameList = document.querySelector('#game-list');

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function createButton(text, action, className) {
    const button = createElement('button', `button ${className}`, text);
    button.type = 'button';
    button.dataset.action = action;
    return button;
}

function createSelect(className, options, value) {
    const select = createElement('select', `field__control ${className}`);
    options.forEach(option => {
        const el = createElement('option', '', option);
        el.value = option;
        select.append(el);
    });
    select.value = value;
    return select;
}

function createInput(className, value, type = 'text') {
    const input = createElement('input', `field__control ${className}`);
    input.type = type;
    input.value = value;
    return input;
}

function createField(labelText, control) {
    const field = createElement('div', 'field');
    field.append(createElement('span', 'field__label', labelText), control);
    return field;
}

function renderEditForm(card, game) {
    const titleInput = createInput('editTitle', game.title);
    titleInput.maxLength = 80;

    const genreInput = createSelect('editGenre', GENRES, game.genre);

    const yearInput = createInput('editYear', game.year, 'number');
    yearInput.min = MIN_YEAR;
    yearInput.max = MAX_YEAR;

    const ratingInput = createInput('editRating', game.rating, 'number');
    ratingInput.min = MIN_RATING;
    ratingInput.max = MAX_RATING;
    ratingInput.step = 0.1;

    const descriptionInput = createElement('textarea', 'field__control editDescription');
    descriptionInput.rows = 4;
    descriptionInput.maxLength = 500;
    descriptionInput.value = game.description;

    const actions = createElement('div', 'game-card__actions');
    actions.append(
        createButton('Сохранить', 'save', 'button--small'),
        createButton('Отмена', 'cancel', 'button--small button--ghost')
    );

    card.append(
        createField('Название', titleInput),
        createField('Жанр', genreInput),
        createField('Год выпуска', yearInput),
        createField('Рейтинг', ratingInput),
        createField('Описание', descriptionInput),
        createElement('p', 'field__error'),
        actions
    );
}

function renderCard(card, game) {
    const head = createElement('div', 'game-card__head');
    head.append(
        createElement('h3', 'game-card__title', game.title),
        createElement('span', 'game-card__rating', `★ ${game.rating}`)
    );

    const meta = createElement('p', 'game-card__meta');
    meta.append(
        createElement('span', 'game-card__genre', game.genre),
        document.createTextNode(`${game.year} г.`)
    );

    const text = createElement('p', 'game-card__text', game.description);

    const favorite = createElement('button', `fav-button${game.favorite ? ' is-active' : ''}`, game.favorite ? '★' : '☆');
    favorite.type = 'button';
    favorite.dataset.action = 'favorite';
    favorite.setAttribute('aria-label', game.favorite ? 'Убрать из избранного' : 'В избранное');

    const actions = createElement('div', 'game-card__actions');
    actions.append(
        favorite,
        createButton('Редактировать', 'edit', 'button--small button--ghost'),
        createButton('Удалить', 'delete', 'button--small button--danger')
    );

    card.append(head, meta, text, actions);
}

export function renderMessage(text, isError = false) {
    gameList.innerHTML = '';
    gameList.append(createElement('div', `message${isError ? ' message--error' : ''}`, text));
}

export function renderGames(games, editingId, emptyText) {
    if (games.length === 0) {
        renderMessage(emptyText);
        return;
    }

    gameList.innerHTML = '';
    games.forEach(game => {
        const card = createElement('article', 'game-card');
        card.dataset.id = game.id;

        if (game.id === editingId) {
            renderEditForm(card, game);
        } else {
            renderCard(card, game);
        }

        gameList.append(card);
    });
}
