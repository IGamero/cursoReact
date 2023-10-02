export async function getClients() {
    // const url = "http://localhost:3000/clients";

    const response = await fetch(import.meta.env.VITE_API_CLIENTS_URL); // No tiene "method" porque pòr default es "get"
    // No tiene "body" porque no se envian datos
    const result = await response.json();
    return result;
}

export async function getClient(id) {

    const response = await fetch(`${import.meta.env.VITE_API_CLIENTS_URL}/${id}`);
    const result = await response.json();
    return result;
}

export async function newClient(data) {
    try {
        const response = await fetch(import.meta.env.VITE_API_CLIENTS_URL, {
            method: 'post',
            body: JSON.stringify(data),  // Datos que vamos a enviar
            headers: {
                'Content-type': "application/json" // Tipo de dato enviado
            }
        })
        await response.json();
    } catch (error) {
        console.log(error)
    }
}

export async function updateClient(id, data) {
    console.log(id, data)

} 
