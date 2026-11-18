import { getData } from "./api.js"
import { addToCart, getCart, getCartCount } from "./cart.js";
import { getFavorites, addToFavorites, renderFavorites } from "./favorites.js";
import { renderProducts, filter, saveProduct, showProductDetail } from './products.js'

let products = [];
let cart = [];
let favorites = [];

const message = document.querySelector("#message");
const categorySelect = document.querySelector("#categorySelect");
const searchInput = document.querySelector("#searchInput");
const productContainer = document.querySelector("#products");
const cartCount = document.querySelector("#cartCount");

const productModal = document.querySelector("#productModal");

async function start() {
    message.textContent = "Загрузка товаров...";
    products = await getData("products");
    cart = await getCart();
    favorites = await getFavorites();
    message.textContent = "";
    renderProducts(products);
    renderCategories();
    updateCartCount(cart);
}
start();


function renderCategories() {
    const categories = [];

    products.forEach(function(product) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    categories.forEach(function(category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);
    });
}

function updateCartCount(cart) {
    cartCount.textContent = getCartCount(cart);
}

categorySelect.addEventListener("change", function() {
    filter(products);
});
searchInput.addEventListener("input", function() {
    filter(products);
});

productContainer.addEventListener("click", async function(event) {
    if (event.target.tagName !== "BUTTON") return;
    const button = event.target;
    const id = button.dataset.id;
    const product = products.find(function(p) {
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
                picture: product.picture || "media/404.png"
            };
            await addToCart(cart, data);
            await saveProduct(product);

            updateCartCount(cart);
            if (!product.quantity) {
                filter(products);
            }
        }
    }
    else if (button.classList.contains("add-favorite")) {
        if (product) {
            const added = await addToFavorites(favorites, product);
            if (!added) {
                alert("Этот товар уже есть в избранном");
            }
        }
    }
    else if (button.classList.contains("product-detail")) {
        if (product) {
            showProductDetail(product);
        }
    }
});

productModal.addEventListener("click", async function(event) {
    if (event.target.tagName !== "BUTTON") return;
    const button = event.target;
    const id = button.dataset.id;
    let product;
    if (id) {
        product = products.find(function(item) {
            return item.id === id;
        });
    }
    console.log(button)
    if (button.id === "closeProduct") {
        productModal.classList.add("hidden");
    } else if (button.classList.contains("add-cart")) {
        workWithCart(product);
    }
});

async function workWithCart(product) {
    if (product && product.quantity > 0) {
            product.quantity -= 1;
            const data = {
                id: product.id,
                title: product.title,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                count: 1,
                picture: product.picture || "media/404.png"
            };
            await addToCart(cart, data);
            await saveProduct(product);

            updateCartCount(cart);
            if (!product.quantity) {
                filter(products);
            }
        }
}

const favoritesModal = document.querySelector("#favoritesModal");

document.querySelector("#favoritesButton").addEventListener("click", async function() {
    // Перечитываем с сервера, чтобы в окне были актуальные данные
    favorites = await getFavorites();
    renderFavorites(favorites);
    favoritesModal.classList.remove("hidden");
});

document.querySelector("#closeFavorites").addEventListener("click", function() {
    favoritesModal.classList.add("hidden");
});
