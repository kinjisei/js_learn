function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

export { saveExpenses, loadExpenses }