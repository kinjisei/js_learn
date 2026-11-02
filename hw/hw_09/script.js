const addExpense = document.querySelector('#addExpense');
const nameExpense = document.querySelector('#nameExpense');
const amountExpense = document.querySelector('#amountExpense');
const categoryExpense = document.querySelector('#categoryExpense');
const messageError = document.querySelector('#messageError');
const expensesList = document.querySelector('#expensesList');
const filterSelect = document.querySelector('#filterSelect');
const total = document.querySelector('#total');


const inputs = [nameExpense, amountExpense];

let expenses = loadExpenses();

const categoryTranslations = {
    products: 'Продукты',
    transport: 'Транспорт',
    funny: 'Развлечения',
    other: 'Другое'
};

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}
filter();
// renderExpenses(expenses);


function addNewExpense() {
    messageError.textContent = '';

    let newName = nameExpense.value.trim().toLowerCase();
    let rawAmount = amountExpense.value.trim();
    let newAmount = Number(rawAmount);
    let selectedCategory = categoryExpense.value;

    if (!newName || !rawAmount || !selectedCategory) {
        messageError.textContent = 'Поля не могут быть пустыми!';
        return;
    }
    if (isNaN(newAmount)) {
        messageError.textContent = 'Значение должно быть числом!';
        return;
    }
    if (newAmount <= 0) {
        messageError.textContent = 'Значение должно быть больше нуля!';
        return;
    }

    let expense = {
        id: Date.now(),
        name: newName,
        amount: newAmount,
        category: selectedCategory,
    };

    expenses.push(expense);
    saveExpenses();


    nameExpense.value = '';
    amountExpense.value = '';
    categoryExpense.selectedIndex = 0;

    filter();
};


function renderExpenses(array) {
    expensesList.innerHTML = '';
    array.forEach(function (item) {
        let russianCategory = categoryTranslations[item.category] || item.category;

        expensesList.innerHTML += `
<div>
    <h3>Трата на: ${item.name}</h3>
    <span>Стоимость: ${item.amount}</span>
    <span>Категория: ${russianCategory}</span>
    <button data-action='delete' data-id='${item.id}'>Удалить</button>
</div>`;
    });
}

addExpense.addEventListener('click', addNewExpense);

inputs.forEach(input => {
    messageError.textContent = '';
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addNewExpense();
        }
    })
})

function filter() {
    const selectedValue = filterSelect.value;
    if (!selectedValue || selectedValue === 'all') {
        renderExpenses(expenses);
        const totalsum = expenses.reduce((sum, item) => {
            return sum + item.amount;
        }, 0)
        total.textContent = `Итоговая сумма затрат: ${totalsum}`
        return;
    }
    const filtered = expenses.filter(ex => ex.category === filterSelect.value);
    if (filtered.length === 0) {
        expensesList.textContent = 'Пока что пусто ...'
        total.textContent = `Итоговая сумма затрат: 0`
    } else {
        const totalsum = filtered.reduce((sum, item) => {
            return sum + item.amount;
        }, 0)
        renderExpenses(filtered);
        total.textContent = `Итоговая сумма затрат: ${totalsum}`
    }
}

filterSelect.addEventListener('change', filter)

expensesList.addEventListener('click', function (event) {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const id = Number(event.target.dataset.id);
    const action = event.target.dataset.action;
    if (action === 'delete') {
        expenses = expenses.filter((m) => {
            return m.id !== id;
        })
    }
    filter();
})