// document.write('text')

const main_header = document.getElementById('main-header')

console.log(main_header);

const test = document.getElementsByClassName('test');
console.log(test[0]);


const test_tag = document.getElementsByTagName('p');
console.log(test_tag);

const main_hears = document.querySelector('#main-header');
const main_hears_1 = document.querySelector('p');
const main_hears_2 = document.querySelector('.test');
console.log(main_hears_1)
console.log(main_hears_2)
console.log(main_hears)

const items = document.getElementById('items')
items.textContent = 'asd';
items.innerHTML = '<p>asd</p>';
items.innerHTML = `
    <div class='cart'>
        <h1>Apple Watch ULTRA</h1>
        <p>Описание товара...</p>
    </div>
`
items.innerHTML += `
    <div class='cart'>
        <h1>Apple Watch ULTRA</h1>
        <p>Описание товара...</p>
    </div>
`

items.style.color = 'red';


const button = document.querySelector('button')
// button.onclick = fn

function fn() {
    console.log('Кликнулся')
}

button.addEventListener('click', function() {
    console.log('Метод addEvent')
})

button.addEventListener('click', fn())

button.removeEventListener('click', fn())

// button.removeEventListener('click', function () {
// })


const text = document.getElementById('text')

function change() {
    text.style.backgroundColor = 'black';
}
