import { createData } from './api.js';

const form = document.querySelector('#productForm');
const message = document.querySelector('#message');
const addProductBtn = document.querySelector('#addProductBtn');

const API_key = '674de4f87814296076a134b1a7f8ccbb';
const API_IMGBB = 'https://api.imgbb.com/1/upload';

async function uploadImage(file) {
    const body = new FormData();
    body.append('image', file);
    const endpoind = API_IMGBB + '?key=' + API_key;
    const response = await fetch(endpoind, {
        method: 'POST',
        body
    });

    if (!response.ok) {
        throw new Error('Ошибка загрузки изображения ' + response.status);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error('Ошибка загрузки изображения ' + data.status);
    }
    return data.data.url;
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    if (addProductBtn.disabled) return;
    addProductBtn.disabled = true;
    const fields = new FormData(form);
    console.log(fields);
    fields.forEach(item => {
        console.log(item);
    })
    const file = fields.get('image');

    try {
        message.textContent = 'Загрузка изображения в ImageBB ...';
        const image = await uploadImage(file);
        message.textContent = 'Добавление продукта в базу данных (MockAPI) ...';
        await createData('products', {
            title: fields.get('title').trim(),
            description: fields.get('description').trim(),
            category: fields.get('category').trim(),
            price: fields.get('price'),
            quantity: fields.get('quantity'),
            picture: image
        })
        form.reset();
        message.textContent = 'Товар успешно создан!';
    } catch (error) {
        message.textContent = 'Неудалось добавить продукт, ошибка: ' + error.message;
    } finally {
        addProductBtn.disabled = false;
    }
})