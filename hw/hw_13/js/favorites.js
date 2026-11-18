import { getData, updateData } from "./api.js";

// Избранное лежит в той же записи carts/1, что и корзина, в поле favorites.
export async function getFavorites() {
    const data = await getData("carts/1");
    return data.favorites || [];
}

// Отправляем только поле favorites: корзина (carts) в записи не затрагивается.
export async function saveFavorites(favorites) {
    await updateData("carts", 1, { favorites: favorites });
}

// Возвращает true, если товар добавлен, и false, если он уже был в избранном.
export async function addToFavorites(favorites, product) {
    const exists = favorites.some(function (item) {
        return item.id === product.id;
    });
    if (exists) {
        return false;
    }
    // Без поля count: в избранном каждый товар хранится в одном экземпляре
    favorites.push({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        picture: product.picture || "media/404.png"
    });
    await saveFavorites(favorites);
    return true;
}

export function renderFavorites(favorites) {
    const container = document.querySelector("#favoritesItems");
    container.innerHTML = "";

    if (favorites.length === 0) {
        container.textContent = "В избранном пока ничего нет";
        return;
    }

    favorites.forEach(function (product) {
        const item = document.createElement("div");
        item.classList.add("cart-item");

        const img = document.createElement("img");
        img.src = product.picture;
        img.alt = product.title;

        const info = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = product.title;
        const price = document.createElement("p");
        price.textContent = `Цена: ${product.price}`;
        info.append(title, price);

        item.append(img, info);
        container.append(item);
    });
}
