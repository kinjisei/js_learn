import { getData, updateData } from "./api.js";

export async function saveProduct(product) {
    const data = {
        "quantity": product.quantity
    };
    await updateData("products", product.id, data);
}
export async function getProducts() {
    return await getData("products")
}

export function renderProducts(products) {
    const container = document.querySelector("#products");

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>Товары не найдены</p>"
        return;
    }

    products.forEach(function(product) {
        if (product.quantity <= 0) {
            return;
        }
        const card = document.createElement("div");
        
        card.classList.add("product");

        card.innerHTML = `
            <img
                src='${product.picture || "media/404.png"}'
                alt='${product.title}'>
            <h3>${product.title}</h3>
            <p>
            Категория: ${product.category}
            </p>
            <p class="product-price">
            Цена: ${product.price}
            </p>
            <button 
                class="add-cart"
                data-id=${product.id}>
                Добавить в корзину
            </button>
            <button
                class="add-favorite"
                data-id=${product.id}>
                В избранное
            </button>
            <button
            class="product-detail"
            data-id=${product.id}
            >
            Посмотреть детально
            </button>
        `;
        container.append(card);
    });
}

export function filter(products) {
    const selected = document.querySelector("#categorySelect").value;
    const search = document.querySelector("#searchInput").value.toLowerCase().trim();

    const filtered = products.filter(function(product) {
        return (selected === "all" || product.category === selected) && product.title.toLowerCase().includes(search);        
    });
    renderProducts(filtered);
}

export function showProductDetail(product) {
    const productModal = document.querySelector("#productModal");
    const productDetail = document.querySelector("#productDetail");

    productModal.classList.remove("hidden");
    productDetail.innerHTML = `
        <img
                src='${product.picture}'
                alt='${product.title}'>
            <h3>${product.title}</h3>
            <p>
            Категория: ${product.category}
            </p>
            <p class="product-price">
            Цена: ${product.price}
            </p>
            <button 
                class="add-cart"
                data-id=${product.id}>
                Добавить в корзину
            </button>
    `;
}
