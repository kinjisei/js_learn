import { todos } from './script.js'

const titleInput = document.querySelector("#todoTitle");
const descriptionInput = document.querySelector("#todoDescription");
const completeCheckbox = document.querySelector("#completeCheckbox");
const addTodoBtn = document.querySelector("#addTodoButton");

const filterSelect = document.querySelector("#filterSelect");
const filterSearch = document.querySelector("#filterSearch");
const todoCount = document.querySelector('#todoCount');


const todoList = document.querySelector(".todoList");


function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodos() {
    let temp = JSON.parse(localStorage.getItem("todos"));
    if (!temp) {
        return [];
    }
    return temp;
}

function renderTodos(array) {
    todoList.innerHTML = "";

    todoCount.textContent = array.length;

    array.forEach(function (item) {
        todoList.innerHTML += `
        <div class="item ${item.is_completed}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button data-action="delete" data-id=${item.id}>Удалить</button>
            <button data-action="complete" data-id=${item.id}>Выполнить</button>
            <button data-action="edit" data-id=${item.id}>Редактировать</button>

        </div>
        `
    });
}

function filter() {
    // console.log(filterSelect.value);
    const value = filterSelect.value;
    const searchValue = filterSearch.value.toLowerCase().trim();
    if (value === "completed") {
        const filtered = todos.filter(function (todo) {
            return todo.is_completed && todo.title
                .toLowerCase()
                .trim()
                .includes(searchValue);
        })
        console.log(filtered)
        renderTodos(filtered);
    } else if (value === "not_completed") {
        const filtered = todos.filter(function (todo) {
            return !todo.is_completed && todo.title
                .toLowerCase()
                .trim()
                .includes(searchValue);
        })
        renderTodos(filtered);
    } else {
        const filtered = todos.filter(function (todo) {
            return todo.title
                .toLowerCase()
                .trim()
                .includes(searchValue);
        });
        renderTodos(filtered);
    }
}





export { titleInput, todoList, filterSearch, filterSelect, addTodoBtn, completeCheckbox, descriptionInput, saveTodos, filter, renderTodos, loadTodos }