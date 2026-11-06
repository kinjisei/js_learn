import { getData } from './api.js'
import { addToCart, getCartCount } from './cart.js'
import { renderProducts, filter } from './products.js'

const message = document.querySelector('#message');
const categorySelect = document.querySelector('#categorySelect');
const searchInput = document.querySelector('#searchInput');
const productContainer = document.querySelector('#products');
const cartCount = document.querySelector('#cartCount');

let products = [];

async function start() {
    message.textContent = 'Загрузка товаров ...';
    products = await getData('products');
    message.textContent = '';
    renderProducts(products);
    renderCategories();
    updateCartCount();
}
start()


function renderCategories() {
    const categories = [];
    products.forEach(function(product) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    categories.forEach(function(category){
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);
    })
}

function updateCartCount() {
    cartCount.textContent = getCartCount();
    console.log(getCartCount())
}

categorySelect.addEventListener('change', filter);
searchInput.addEventListener('input', filter);

productContainer.addEventListener('click', async function(event) {
    if (event.target.classList.contains('add-cart')) {
        const id = event.target.dataset.id;
        const product = products.find(p => {
            return p.id === id;
        });
        if (product) {
            const data = {
                id: product.id,
                title: product.title,
                descrioption: product.descrioption,
                quantity: product.quantity,
                price: product.price,
                count: 1
            };
            await addToCart(data);
            updateCartCount();
        }
    }
})


export { products }