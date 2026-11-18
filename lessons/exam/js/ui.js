const gameList = document.querySelector('#game-list');

const GENRES = ['RPG', 'Action', 'Strategy', 'Adventure', 'Shooter', 'Simulator'];

function createSelect(className, options, value) {
    const select = document.createElement('select');
    select.className = className;
    options.forEach(option => {
        const el = document.createElement('option');
        el.value = option;
        el.textContent = option;
        select.append(el);
    });
    select.value = value;
    return select;
}

function createInput(className, value, type = 'text') {
    const input = document.createElement('input');
    input.type = type;
    input.className = className;
    input.value = value;
    return input;
}

function createButton(text, action, className = '') {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = className;
    btn.textContent = text;
    btn.dataset.action = action;
    return btn;
}

function renderEditForm(card, game) {
    const titleInput = createInput('editTitle', game.title);
    const genreInput = createSelect('editGenre', GENRES, game.genre);
    const yearInput = createInput('editYear', game.year, 'number');
    yearInput.min = 1970;
    yearInput.max = 2027;
    const ratingInput = createInput('editRating', game.rating, 'number');
    ratingInput.min = 0;
    ratingInput.max = 10;
    ratingInput.step = 0.1;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.className = 'editDescription';
    descriptionInput.value = game.description;

    card.append(titleInput, genreInput, yearInput, ratingInput, descriptionInput, createButton('Сохранить', 'save', 'saveBtn'), createButton('Отмена', 'cancel', 'cancelBtn'));
}

export function renderGames(array, editingId = null, emptyText = 'Тут пока пусто...') {
    gameList.innerHTML = '';
    if (array.length === 0) {
        const empty = document.createElement('div');
        empty.id = 'emptyList';
        empty.textContent = emptyText;
        gameList.append(empty);
        return;
    }
    array.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game');
        card.dataset.id = game.id;

        if (game.id === editingId) {
            renderEditForm(card, game);
            gameList.append(card);
            return;
        }

        const head = document.createElement('div');
        head.className = 'head'

        const name = document.createElement('h3');
        name.className = 'gameName';
        name.textContent = 'Название игры: ' + game.title;

        const info = document.createElement('span');
        info.className = 'gameInfo';
        info.textContent = `Жанр: ${game.genre} | Год выпуска: ${game.year} | Рэйтинг: ${game.rating} из 10`;
        
        head.append(name, info);

        const description = document.createElement('p');
        description.className = 'gameDescription';
        description.textContent = game.description;

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'removeBtn';
        removeBtn.textContent = 'Удалить';
        removeBtn.dataset.action = 'delete';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'editBtn';
        editBtn.textContent = 'Редактировать';
        editBtn.dataset.action = 'edit';

        const favBtn = document.createElement('button');
        favBtn.type = 'button';
        favBtn.className = 'favBtn';
        favBtn.textContent = game.favorite ? '★' : '☆';
        favBtn.dataset.action = 'favorite';

        card.append(head, description, removeBtn, editBtn, favBtn);
        gameList.append(card);
    })
}