import { getCart } from './cart.js'
import { getData } from './api.js'

const cartItems = document.querySelector('#cartItems');
const totalPrice = document.querySelector('#totalPrice');

let cart = [];

async function start() {
    const data = await getData("carts/1");
    cart = data.carts;
    renderCart(cart);
} 

start();

function renderCart(cart) {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>В корзине пока пусто ...</p>';
        totalPrice.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('cart-item');
        element.innerHTML = `
        <img src=${item.picture} alt=${item.title}>
        <div class='cart-info'>
            <h3>${item.title}</h3>
            <p>${item.price}</p>
        </div>
        <div class='cart-actions'>
            <button class='minus' data-id=${item.id}>-</button>
            <span>${item.count}</span>
            <button class='plus' data-id=${item.id}>+</button>
            <button class='delete' data-id=${item.id}>Удалить</button>
        </div>
        `
        total += item.price * item.count;
        cartItems.append(element)
    });
    totalPrice.textContent = total;
}