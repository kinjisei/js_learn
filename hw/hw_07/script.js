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

const calculator = document.querySelector('#calculator')
const priceInput = document.querySelector('#priceInput')
const amountInput = document.querySelector('#amountInput')
const totalPriceOutput = document.querySelector('#totalPriceOutput')

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

calculator.addEventListener('submit', function(event) {
    event.preventDefault();
    let price = Number(priceInput.value);
    let amount = Number(amountInput.value);
    if (price <= 0 || amount <= 0) {
        totalPriceOutput.style.color = 'red'
        totalPriceOutput.textContent = "Значения должны быть больше нуля!"
    } else {
        totalPriceOutput.style.color = 'white'
        totalPriceOutput.textContent = `К оплате: ${price*amount} ₸`
    }
})