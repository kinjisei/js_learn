import { createData } from "./api.js"

const form = document.querySelector("#productForm");
const message = document.querySelector("#message");
const addProductBtn = document.querySelector("#addProductBtn");

const API_IMGBB = "https://api.imgbb.com/1/upload"
const API_key = "2e4e025fec3e3f108e0331c490ad881f"

async function uploadImage(file) {
    const body = new FormData();
    // console.log(body);

    body.append("image", file);
    const endpoint = API_IMGBB + "?key=" + API_key;

    // Content-type: multipart/form-data
    const response = await fetch(endpoint, {
        method: "POST",
        body
    });
    if (!response.ok) {
        throw new Error("Ошибка загрузки изображения " + response.status);
    }
    const data = await response.json();

    if (!data.success) {
        throw new Error("Ошибка загрузки изображения " + data.status);
    }

    return data.data.url;
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (addProductBtn.disabled) return;

    addProductBtn.disabled = true;

    const fields = new FormData(form);
    console.log(fields);
    fields.forEach(function(item) {
        console.log(item);
    });
    const file = fields.get("image");

    try {
        message.textContent = "Загрузка изображения в IMGBB...";
        const image = await uploadImage(file);
        
        message.textContent = "Добавление продукта в базу данных (MockAPI)...";
        await createData("products", {
            "title": fields.get("title").trim(),
            "description": fields.get("description").trim(),
            "category": fields.get("category").trim(),
            "price": fields.get("price"),
            "quantity": fields.get("quantity"),
            "picture": image
        });
        form.reset();
        message.textContent = "Продукт успешно создан!"
    } catch(error) {
        message.textContent = "Не удалось добавить продукт, ошибка: " + error.message;
    } finally {
        addProductBtn.disabled = false;
    }

});

