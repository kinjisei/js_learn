import { getData, updateData } from "./api.js"
import { getProducts } from "./products.js";

export async function getCart() {
    const data = await getData("carts/1");
    return data.carts;
}

export async function saveCart(cart) {
    const data = {
        "carts": cart
    };
    await updateData("carts", 1, data);
}

export async function addToCart(cart, product) {
    const existProduct = cart.find(function (p) {
        return product.title === p.title;
    });
    if (existProduct) {
        existProduct.count += 1;
        existProduct.quantity -= 1;
    } else {
        cart.push(product);
    }
    await saveCart(cart);
}

export function getCartCount(cart) {
    let total = 0
    cart.forEach(function(item) {
        total += item.count;
    });
    return total;
}


export async function updateProductQuantity(changes) {
    const products = await getProducts();
    
    for (const {product_id, change} of changes) {
        const product = products.find(function(product) {
            return product.id === product_id;
        });
        if (!product) {
            console.log("Товар не найден!")
            continue;
        }
        product.quantity += change;
    
        await updateData("products", product.id, product);
    }
}
