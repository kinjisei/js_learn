const nameTitle = document.querySelector('#nameTitle');
const descriptionTitle = document.querySelector('#descriptionTitle');
const changeNameInput = document.querySelector('#changeNameInput');
const saveNewName = document.querySelector('#saveNewName');
const updateInfo = document.querySelector('#updateInfo');
const changeForm = document.querySelector('#changeForm');
const resetProfile = document.querySelector('#resetProfile');
const card = document.querySelector('#card');
const mesenges = document.querySelector('#mesenges');

const savedName = localStorage.getItem('profileName');
const savedDescription = localStorage.getItem('profileDescription');

if (savedName) {
    nameTitle.textContent = savedName;
}
if (savedDescription) {
    descriptionTitle.innerHTML = savedDescription;
}

saveNewName.addEventListener('click', function() {
    let new_name = changeNameInput.value.trim();

    if (!new_name) {
        mesenges.textContent = 'Введите имя!';
        return;
    }

    nameTitle.textContent = new_name;
    mesenges.textContent = 'Имя успешно изменено!';

    localStorage.setItem('profileName', new_name);
});

updateInfo.addEventListener('click', function() {
    const newDescription = 'Я изучаю <b>JavaScript</b> и учусь управлять страницей!';
    descriptionTitle.innerHTML = newDescription;
    mesenges.textContent = 'Описание обновлено!';

    localStorage.setItem('profileDescription', newDescription);
});

changeForm.addEventListener('click', function() {
    if (card.style.backgroundColor === 'black') {
        card.style.backgroundColor = 'white';
        card.style.color = 'black';
        mesenges.textContent = 'Карточка стала светлой';
    } else {
        card.style.backgroundColor = 'black';
        card.style.color = 'white';
        mesenges.textContent = 'Карточка стала черной';
    }
});

resetProfile.addEventListener('click', function() {
    localStorage.removeItem('profileName');
    localStorage.removeItem('profileDescription');

    
    nameTitle.textContent = 'Ерболат';
    descriptionTitle.textContent = 'Я учу JS'; 
    changeNameInput.value = '';

    mesenges.textContent = 'Профиль сброшен';
});

card.addEventListener('mouseenter', function() {
    mesenges.textContent = 'Вы навели мышь на карточку';
});

card.addEventListener('mouseleave', function() {
    mesenges.textContent = '';
});