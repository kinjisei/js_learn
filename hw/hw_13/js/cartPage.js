import { getCart, saveCart, updateProductQuantity } from "./cart.js";

const cartItems = document.querySelector("#cartItems");
const totalPrice = document.querySelector("#totalPrice");

let cart = []

async function start() {
    cart = await getCart();
    renderCart(cart);
}
start();

function renderCart(cart) {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Корзина пустая...</p>";
        totalPrice.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach(function (item) {
        const element = document.createElement("div");

        element.classList.add("cart-item");

        element.innerHTML = `
            <img src=${item.picture} alt=${item.title}>
            <div class="cart-info">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
            </div>
            <div class="cart-actions">
                <button class="minus" data-id=${item.id}>
                -
                </button>
                <span>${item.count}</span>
                <button class="plus" data-id=${item.id}>
                +
                </button>
                <button class="delete" data-id=${item.id}>
                Удалить
                </button>
            </div>
        `;
        total += item.price * item.count;
        cartItems.append(element);
    });
    totalPrice.textContent = total;
}




cartItems.addEventListener("click", async function (event) {
    if (event.target.tagName === "BUTTON") {
        event.target.disabled = true;
        const product_id = event.target.dataset.id;
        const product = cart.find(function (product) {
            return product.id === product_id;
        });
        if (!product) {
            return;
        }

        if (event.target.classList.contains("minus")) {
            if (product.count > 1) {
                product.count -= 1;
            } else {
                const index = cart.indexOf(product);
                cart.splice(index, 1);
            }
            product.quantity += 1;
            await updateProductQuantity([{product_id, change: 1}]);
        }
        else if (event.target.classList.contains("plus")) {
            if (product.quantity > 0) {
                product.count += 1;
                product.quantity -= 1;
                await updateProductQuantity([{product_id, change: -1}]);
            } else {
                alert("Товара нет на складе!");
            }
        }
        else if (event.target.classList.contains("delete")) {
            await updateProductQuantity([{product_id, change: product.count}]);
            const index = cart.indexOf(product);
            cart.splice(index, 1);
        }
        await saveCart(cart);
        renderCart(cart);
        event.target.disabled = false;
    }
});


document.querySelector("#clearButton").addEventListener("click", async function () {
    const changes = []
    cart.forEach(function (product) {
        changes.push({product_id: product.id, change: product.count});
    });
    await updateProductQuantity(changes);
    cart = [];
    saveCart(cart);
    renderCart(cart);
});
