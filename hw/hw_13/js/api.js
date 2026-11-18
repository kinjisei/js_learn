const API_MOCK = "https://6ae9f1d73d3dd3d37be5f138.mockapi.io/api/online_store/"

async function getData(endpoint) {
    const response = await fetch(`${API_MOCK}${endpoint}`);
    const data = await response.json();
    return data;
}

async function createData(endpoint, data) {
    const response = await fetch(`${API_MOCK}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const dataa = await response.json();
    return dataa;
}

async function deleteData(endpoint, id) {
    const response = await fetch(`${API_MOCK}${endpoint}/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    return data;
}

async function updateData(endpoint, id, data) {
    const response = await fetch(`${API_MOCK}${endpoint}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const dataa = await response.json();
    return dataa;
}

export {getData, createData, updateData, deleteData}
