const movieList = document.querySelector('#movieList');
const movieGenreInput = document.querySelector('#movieGenreInput');
const movieNameInput = document.querySelector('#movieNameInput');
const addmovie = document.querySelector('#addmovie');
const message = document.querySelector('#message');
const movieCounter = document.querySelector('#movieCounter');
const movieNameInputFilter = document.querySelector('#movieNameInputFilter');
const filterSelect = document.querySelector('#filterSelect');
const filter = document.querySelector('#filter');
const filtermessage = document.querySelector('#filtermessage');


let savedMovies = localStorage.getItem('movies');
let movies = savedMovies ? JSON.parse(savedMovies) : [];

filteredList();

function saveAndUpdate() {
    localStorage.setItem('movies', JSON.stringify(movies));
    filteredList();
}

addmovie.addEventListener('submit', function (event) {
    event.preventDefault();
    let name = String(movieNameInput.value).trim().toLowerCase();
    let genre = String(movieGenreInput.value).trim().toLowerCase();
    if (!name || !genre) {
        message.textContent = 'Поля не могут быть пустыми!'
        return;
    }
    message.textContent = '';

    let movie = {
        name: name,
        genre: genre,
        status: false,
        id: Date.now(),
        isEditing: false,
    }

    movieNameInput.value = '';
    movieGenreInput.value = '';
    movies.push(movie);

    saveAndUpdate();
})

function renderMovies(array) {
    movieList.innerHTML = '';
    const watched = array.filter(function (film) {
        return film.status === true;
    });
    const not_watched = array.filter(function (film) {
        return film.status === false;
    })
    movieCounter.textContent = `Всего фильмов: ${array.length}. Из них: просмотренных - ${watched.length}, не просмотренных - ${not_watched.length}`;

    array.forEach(function (item) {
        let opstatus = item.status ? 'Не просмотрен' : 'Просмотрен';
        let statusText = item.status ? 'Просмотрен' : 'Не просмотрен';
        if (item.isEditing) {
            movieList.innerHTML += `
<div class='card'>
    <input type='text' class='edit-name' placeholder='Введите новое название фильма'>
    <input type='text' class='edit-genre' placeholder='Введите новый жанр фильма'>
    <button data-action='save' data-id='${item.id}'>Сохранить</button>
    <button data-action='cancel' data-id='${item.id}'>Отмена</button>
    <p class='errorMessage'></p>
</div>`;
        } else {
            movieList.innerHTML += `
<div class='card'>
    <p>Название фильма: ${item.name}<br>Жанр фильма: ${item.genre}<br>${statusText}</p>
    <button data-action='watched' data-id=${item.id}>${opstatus}</button>
    <button data-action='edit' data-id=${item.id}>Редактировать</button>
    <button data-action='delete' data-id=${item.id}>Удалить</button>
</div>`
        }
    })
}

movieList.addEventListener('click', function (event) {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const id = Number(event.target.dataset.id);
    const action = event.target.dataset.action;
    const movie = movies.find(function (movie) {
        return movie.id === id;
    })
    if (action === 'watched') {
        movie.status = !movie.status;
        saveAndUpdate();
    } else if (action === 'edit') {
        movie.isEditing = true;
        filteredList();
    } else if (action === 'cancel') {
        movie.isEditing = false;
        filteredList();
    } else if (action === 'save') {
        const card = event.target.closest('.card');
        const nameInput = card.querySelector('.edit-name');
        const genreInput = card.querySelector('.edit-genre');
        const errorMessage = card.querySelector('.errorMessage')

        let newName = String(nameInput.value).trim().toLowerCase();
        let newGenre = String(genreInput.value).trim().toLowerCase();
        if (newName && newGenre) {
            movie.name = newName;
            movie.genre = newGenre;
            movie.isEditing = false;
            saveAndUpdate();
        } else {
            errorMessage.textContent = 'Поля не должны быть пустыми!'
        }
    } else if (action === 'delete') {
        movies = movies.filter(function (m) {
            return m.id !== id;
        });
        saveAndUpdate();
    }
})

function filteredList() {
    const filterValue = filterSelect.value;
    const searchValue = movieNameInputFilter.value.toLowerCase().trim();
    const filtered = movies.filter(function (movie) {
        let mN = movie.name.toLowerCase().trim().includes(searchValue);
        if (filterValue === 'watched') {
            return movie.status && mN || false;
        } else if (filterValue === 'not_watched') {
            return !movie.status && mN || false;
        } else {
            return mN || false;
        }
    })
    if (filtered.length === 0) {
        filtermessage.textContent = 'Фильмы не найдены';
        movieList.innerHTML = '';
    } else {
        filtermessage.textContent = '';
        renderMovies(filtered);
    }
}
movieNameInputFilter.addEventListener("input", filteredList);
filterSelect.addEventListener("change", filteredList);
