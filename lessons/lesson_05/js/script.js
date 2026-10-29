import { titleInput, todoList, filterSearch, filterSelect, addTodoBtn, completeCheckbox, descriptionInput, saveTodos, filter, renderTodos, loadTodos, currentUserId } from "./todo.js"

import { getUsers, logoutUser } from './auth.js'

export let todos = loadTodos();

const authLink = document.querySelector('#authLink')

function start() {
    const users = getUsers();
    const user = users.find(function(user) {
        return user.id === currentUserId;
    })
    if (!user) {
        return;
    }
    authLink.textContent = `${user.username}, выйти`;


    renderTodos(todos)
}

authLink.addEventListener('click', function() {
    logoutUser();
})


addTodoBtn.addEventListener("click", function() {
    if (!titleInput.value || !descriptionInput.value) {
        alert("Поля должны быть не пустыми!")
        return;
    }

    let todo = {
        id: Date.now(),
        title: titleInput.value,
        description: descriptionInput.value,
        is_completed: completeCheckbox.checked
    }
    
    todos.push(todo);
    saveTodos();
    // console.log(todos);
    
    titleInput.value = "";
    descriptionInput.value = "";
    completeCheckbox.checked = false;
    
    renderTodos(todos);
})


todoList.addEventListener("click", function(event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    }
    const action = event.target.dataset.action;
    const id = Number(event.target.dataset.id);
    // console.log(event.target.parentElement)
    if (action === "delete") {
        todos = todos.filter(function(todo) {
            return todo.id !== id;
        })
        filter();
        saveTodos();
    } else if (action === "complete") {
        const todo = todos.find(function(todo) {
            return todo.id === id;
        });
        todo.is_completed  = !todo.is_completed;
        saveTodos();
        filter();
    } else if (action === "edit") {
        const todo = todos.find(function(todo) {
            return todo.id === id;
        });

        todo.title = prompt("Введите титул:")
        todo.description = prompt("Введите описание:")
        filter();
        saveTodos();
    }
});


filterSelect.addEventListener("change", filter);
filterSearch.addEventListener("input", filter);

start(todos);