// const promise = fetch('https://jsonplaceholder.typicode.com/todos');
// console.log(promise);

// promise.then(function (response) {
//     return response.json();
// })
// .then(function (items) {
//     console.log(items);
// })
// .catch(function(error) {
//     console.log(error);
// })

async function loadTodos() {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    let todoList = await response.json();
    console.log('Todolist', todoList);
}

loadTodos();
console.log('hello')