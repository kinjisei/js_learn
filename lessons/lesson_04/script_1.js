const titleInput = document.querySelector('#todoTitle');
const descriptionInput = document.querySelector('#todoDescription');
const addTodoButton = document.querySelector('#addTodoButton');

const todoList = document.querySelector('.todoList');

let todos = loadTodos();


addTodoButton.addEventListener('click', function() {
    if (!titleInput.value || !descriptionInput.value) {
        alert('Поля должны быть не пустыми')
        return;
    }

    let todo = {
        title: titleInput.value,
        description: descriptionInput.value
    }

    todos.push(todo);
    saveTodos();
    // console.log(todos);
    titleInput.value = '';
    descriptionInput.value = '';

    renderTodos(todos);
})

function renderTodos(array) {
    todoList.innerHTML = '';

    array.forEach(function (item) {
        todoList.innerHTML += `
        <div class='item'>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
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