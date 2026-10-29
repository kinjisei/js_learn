const pointCounter = document.querySelector('#pointCounter');
const addPoint = document.querySelector('#addPoint');

const redBtn = document.querySelector('#redBtn');
const greenBtn = document.querySelector('#greenBtn');
const blueBtn = document.querySelector('#blueBtn');
const square = document.querySelector('#square');

const textlength = document.querySelector('#textlength')
const lengthInput = document.querySelector('#lengthInput')
const textInputTotal = document.querySelector('#textInputTotal')
const text = document.querySelector('#text')


addPoint.addEventListener('click', function(event) {
    let points = Number(pointCounter.textContent);
    if (event.shiftKey) {
        pointCounter.textContent = points + 5;
    } else {
        pointCounter.textContent = points + 1;
    }
    console.log(event.type)
})

pointCounter.addEventListener('dblclick', function(event) {
    pointCounter.textContent = 0
    console.log(event.type)    
})

square.addEventListener('click', function(event) {
    if (event.target.tagName === "BUTTON") {
        if (event.target.id === 'redBtn') {
            square.style.backgroundColor = 'red'
        } else if (event.target.id === 'greenBtn') {
            square.style.backgroundColor = 'green'
        } else if (event.target.id === 'blueBtn') {
            square.style.backgroundColor = 'blue'
        } 
    }
})

lengthInput.addEventListener('input', function(event) {
    textlength.textContent = event.target.value.length

    if (event.target.value.length >= 20) {
        text.style.backgroundColor = 'red';
    } else {
        text.style.backgroundColor = 'black';
        text.style.color = 'white';
    }
})

lengthInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        textInputTotal.textContent = 'Длина сообщения: ' + event.target.value.length;
    }
})