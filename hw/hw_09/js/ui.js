import { categoryTranslations } from './const.js';

function renderExpenses(array, expensesList) {
    expensesList.innerHTML = '';
    array.forEach(function (item) {
        let russianCategory = categoryTranslations[item.category] || item.category;

        expensesList.innerHTML += `
<div class="expense-item">
    <div class="expense-info">
        <h3>${item.name}</h3>
        <div class="expense-details">
            <span class="expense-amount">${item.amount} ₸</span>
            <span class="expense-category">${russianCategory}</span>
        </div>
    </div>
    <button class="delete-btn" data-action='delete' data-id='${item.id}'>Удалить</button>
</div>`;
    });
}

export { renderExpenses }