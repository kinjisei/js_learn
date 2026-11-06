import { getData, updateData } from "./api.js"

let cart = []

export async function getCart() {
    const data = await getData("carts/1");
    cart = data.carts;
}
getCart();

export async function addToCart(product) {

    const existProduct = cart.find(function (p) {
        return product.title === p.title;
    });
    if (existProduct) {
        existProduct.count += 1;
    } else {
        cart.push(product);
    }
    const data = {
        "carts": cart
    };
    await updateData("carts", "1", data);
}

export function getCartCount() {
    let total = 0
    cart.forEach(item => {
        total += item.count;
    });
    return total
}