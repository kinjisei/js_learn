const API_MOCK = 'https://6ae9f1da3d3dd3d37be5f13f.mockapi.io/api/online_store/'

async function getData(endpoint) {
    const response = await fetch(`${API_MOCK}${endpoint}`);
    const data = await response.json();
    return data; 
}

async function createData(endpoint, data) {
    const response = await fetch(`${API_MOCK}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const dataa = await response.json();
    return dataa;
}

async function deleteData(endpoint, id) {
    const response = await fetch(`${API_MOCK}${endpoint}/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

async function updateData(endpoint, id, data) {
    const response = await fetch(`${API_MOCK}${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const dataa = await response.json();
    return dataa;
}

async function main() {
    const data = await getData('products');
    console.log(data);
    const product = {
        title: 'Lenovo Legion',
        description: 'very good laptop',
        quantity: 10
    }
    // const post_result = await createData('products', product);
    // console.log(post_result);

    const detete_result = await deleteData('products', 100);
    console.log(detete_result);

    const updated_data = {
        title: 'update',
        description: 'update'
    }

    const update_data = await updateData('products', 3, updated_data);
    console.log(update_data)
}

main();