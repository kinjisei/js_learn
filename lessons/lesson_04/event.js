const helloBtn = document.querySelector('#helloBtn');
const helloMessage = document.querySelector('#helloMessage');

helloBtn.addEventListener('click', function (event) {
    console.log(event)
    console.log(event.type)
    console.log(event.target)
    console.log(event.clientX)
    console.log(event.clientY)
    console.log(event.shiftKey)
    console.log(event.currentTarget)

    if (event.shiftKey) {
        helloMessage.textContent = 'Секретное сообщение'
    } else {
        helloMessage.textContent = 'Событие Клик!'
    }

    event.target.style.backgroundColor = 'red'
})

const inputMessage = document.querySelector('#inputMessage');
const inputP = document.querySelector('#inputP');

inputMessage.addEventListener('keydown', function (event) {
    console.log(event);
    console.log(event.key);

    if (event.key === 'Enter') {
        inputP.textContent = 'Hello, ' + inputMessage.value;
    }

    if (event.key === 'Escape') {
        inputP.textContent = '';
        inputMessage.value = '';
    }
})

const inputName = document.querySelector('#inputName')
const outputName = document.querySelector('#outputName')

inputName.addEventListener('keydown', function (event) {

    if (event.key === 'Enter' && !inputName.value) {
        alert('Поле пустое!')
        return;
    }

    if (event.key === 'Enter') {
        outputName.textContent = 'Hello, ' + inputName.value;
        console.log(inputName.value.trim());
    }

    if (event.key === 'Escape') {
        outputName.textContent = '';
        inputName.value = '';
    }
})

const div = document.querySelector('#div')
const div_btn = document.querySelector('#div-btn')

div.addEventListener('click', function(event) {
    console.log(event.target);
    console.log(event.currentTarget);
    
    if (event.target.tagName === 'BUTTON') {
        console.log('Обработана кнопка')
        console.log(event.target.dataset.action)

        if (event.target.dataset.action === '1') {
            document.querySelector('#div-message').textContent = 'Нажата кнопка 1'
        }

        return;
        
    }
    console.log('Обработан блок');
})

// div_btn.addEventListener('click', function() {
//     console.log('Обработана кнопка');
// })



const form = document.querySelector('form')
const loginInput = document.querySelector('#userLogin')
const passwordInput = document.querySelector('#userPassword')

let users = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let user = {
        login: loginInput.value,
        password: passwordInput.value
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Пользователь зарегестрирован!');

})