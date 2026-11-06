import { products } from './main.js'

export function renderProducts(products) {
    const container = document.querySelector('#products');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>Товары не найдены</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product');
        card.innerHTML = `
<img src='${product.picture} alt='${product.title}'>
<h3>${product.title}</h3>
<p>Категоря: ${product.category}</p>
<p class='product-price'>Цена: ${product.price}</p>
<button class='add-cart' data-id=${product.id}>Добавить в корзину</button>
        `;
        container.append(card);
    });
}

export function filter() {
    const selected = document.querySelector('#categorySelect').value;
    const search = document.querySelector('#searchInput').value.toLowerCase().trim();

    const filtered = products.filter(product => {
        return (selected === 'all' || product.category === selected) && product.title.toLowerCase().includes(search);
    })

    renderProducts(filtered)
}