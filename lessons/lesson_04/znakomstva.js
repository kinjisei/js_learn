const form = document.querySelector('form')
const nameInput = document.querySelector('#nameInput')
const ageInput = document.querySelector('#ageInput')
const infoOutput = document.querySelector('#infoOutput')

let meetting = JSON.parse(localStorage.getItem('meetting'));


form.addEventListener('submit', function (event) {
    event.preventDefault();

    let user = {
        name: nameInput.value,
        age: ageInput.value
    }

    
    infoOutput.textContent = `Меня  зовут ${user.name}, мне ${user.age} лет`

    localStorage.setItem('meetting', JSON.stringify(user))
})

console.log(meetting)
infoOutput.textContent = `Меня  зовут ${meetting.name}, мне ${meetting.age} лет`    