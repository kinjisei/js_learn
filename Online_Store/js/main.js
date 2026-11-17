import { getData } from "./api.js"
import { addToCart, getCart, getCartCount } from "./cart.js";
import { renderProducts, filter, saveProduct, showProductDetail } from './products.js'

let products = [];
let cart = [];

const message = document.querySelector("#message");
const categorySelect = document.querySelector("#categorySelect");
const searchInput = document.querySelector("#searchInput");
const productContainer = document.querySelector("#products");
const cartCount = document.querySelector("#cartCount");
const productModal = document.querySelector('#productModal');


async function start() {
    message.textContent = "Загрузка товаров...";
    products = await getData("products");
    cart = await getCart();
    message.textContent = "";
    renderProducts(products);
    renderCategories();
    updateCartCount(cart);
}
start();


function renderCategories() {
    const categories = [];

    products.forEach(function (product) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    categories.forEach(function (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);
    });
}

function updateCartCount(cart) {
    cartCount.textContent = getCartCount(cart);
}

categorySelect.addEventListener("change", function () {
    filter(products);
});
searchInput.addEventListener("input", function () {
    filter(products);
});

productContainer.addEventListener("click", async function (event) {
    if (event.target.tagName !== 'BUTTON') return;
    const button = event.target;
    const id = event.target.dataset.id;
    const product = products.find(function (p) {
        return p.id === id;
    });
    if (button.classList.contains("add-cart")) {
        if (product && product.quantity > 0) {
            product.quantity -= 1;
            const data = {
                id: product.id,
                title: product.title,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                count: 1,
                picture: product.picture || 'media/404.jpg'
            };
            await addToCart(cart, data);
            await saveProduct(product);

            updateCartCount(cart);
            if (!product.quantity) {
                filter(products);
            }
        }
    } else if (button.classList.contains('product-detail')) {
        if (product) {
            showProductDetail(product);
        }
    }
});


productModal.addEventListener('click', async event => {
    const button = event.target
    if (button.tagName !== 'BUTTON') return;
    const id = button.dataset.id;
    const product = products.find(item => {
        return item.id === id;
    })
    
    if (button.id === 'closeProduct') {
        console.log(button)
        productModal.classList.add('hidden');
    } else if (button.id === 'addToCart') {
        
        if (product && product.quantity > 0) {
            product.quantity -= 1;
            const data = {
                id: product.id,
                title: product.title,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                count: 1,
                picture: product.picture || './media/404.jpg'
            };
            await addToCart(cart, data);
            await saveProduct(product);

            updateCartCount(cart);
            if (!product.quantity) {
                filter(products);
            }
        }
    }
})