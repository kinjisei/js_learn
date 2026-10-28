const titleInput = document.querySelector('#todoTitle');
const descriptionInput = document.querySelector('#todoDescription');
const completeCheckbox = document.querySelector('#completeCheckbox')
const filterSearch = document.querySelector('#filterSearch')
const addTodoButton = document.querySelector('#addTodoButton');

const filterSelect = document.querySelector('#filterSelect');
const todoList = document.querySelector('.todoList');

let todos = loadTodos();


addTodoButton.addEventListener('click', function () {
    if (!titleInput.value || !descriptionInput.value) {
        alert('Поля должны быть не пустыми')
        return;
    }

    let todo = {
        id: Date.now(),
        title: titleInput.value,
        description: descriptionInput.value,
        is_complited: completeCheckbox.checked,
    }

    todos.push(todo);
    saveTodos();
    // console.log(todos);
    titleInput.value = '';
    descriptionInput.value = '';
    completeCheckbox.checked = false;

    renderTodos(todos);
})

function renderTodos(array) {
    todoList.innerHTML = '';

    array.forEach(function (item) {
        todoList.innerHTML += `
        <div class='item ${item.is_complited}'>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button data-action="delete" data-id=${item.id}>Удалить</button>
            <button data-action="complete" data-id=${item.id}>Выполнить</button>
            <button data-action="edit" data-id=${item.id}>Изменить</button>
        </div>
        `
    })
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    let temp = JSON.parse(localStorage.getItem('todos'));
    if (!temp) {
        return [];
    }
    return temp;
}

todoList.addEventListener('click', function (event) {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const action = event.target.dataset.action;
    const id = Number(event.target.dataset.id);

    if (action === 'delete') {
        todos = todos.filter(function (todo) {
            return todo.id !== id;
        })
        filter();
        saveTodos();
    } else if (action === 'complete') {
        const todo = todos.find(function (todo) {
            return todo.id === id
        })
        todo.is_complited = !todo.is_complited;
        saveTodos();
        filter();
    } else if (action === 'edit') {
        const item_div = event.target.parentElement
        item_div.innerHTML = `
        <div>
            <input type='text' placeholder='Введите новое имя задачи' id='newTaskName'>
            <input type='text' placeholder='Введите новое описание задачи' id='newTaskDescription'>
            <button id='acceptTaskChanges'>Сохранить</button>
        </div>
        `
        const inputName = item_div.querySelector('#inputName')
        const inputDescription = item_div.querySelector('#inputDescription')
        item_div.querySelector("#acceptTaskChanges").addEventListener('click', function (item) {
            const todo = todos.find(function (todo) {
                return todo.id === id;
            });
            todo.title = inputName.value.trim();
            todo.description = inputDescription.value.trim();

            saveTodos();
            filter();
        })
    }
})



function filter() {
    const value = filterSelect.value;
    const searchValue = filterSearch.value.trim().toLowerCase();
    if (value === 'complited') {
        const filtered = todos.filter(function (todo) {
            return todo.is_complited && todo.title.toLowerCase().trim().includes(searchValue);
        })
        renderTodos(filtered);
    } else if (value === 'not_complited') {
        const filtered = todos.filter(function (todo) {
            return !todo.is_complited && todo.title.toLowerCase().trim().includes(searchValue);
        })
        renderTodos(filtered);
    } else {
        const filtered = todos.filter(function (todo) {
            return todo.title.toLowerCase().trim().includes(searchValue);
        })
        renderTodos(filtered);
    }
}

filterSelect.addEventListener('change', filter);
filterSearch.addEventListener('input', filter);


renderTodos(todos);