const uploadUsers = document.querySelector('#uploadUsers');
const userList = document.querySelector('#userList');
const nameInput = document.querySelector('#nameInput')

let users = [];

async function upload() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Ошибка сервера');
    }
    const data = await response.json();
    return data;
}

async function start() {
    userList.textContent = 'Загрузка ...';
    try {
        users = await upload();
        renderUsers(users); 
    } catch (error) {
        userList.textContent = 'Ошибка загрузки данных'; 
    }
}

function renderUsers(array) {
    userList.innerHTML = '';
    if (array.length === 0) {
        userList.textContent = 'Пользователи не найдены :('
        return;
    }
    array.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user');
        card.innerHTML = `
<h3>Имя: ${user.name}</h3>
<p>Электронная почта: ${user.email}</p>
<p>Номер телефона: ${user.phone}</p>
        `
        userList.append(card);
    })
}

function filter() {
    const search = nameInput.value.trim().toLowerCase();
    console.log(search)
    const filtered = users.filter(user => {
        return user.name.trim().toLowerCase().includes(search);
    })
    console.log(filtered)
    renderUsers(filtered);
}

uploadUsers.addEventListener('click', start);
nameInput.addEventListener('input', filter);