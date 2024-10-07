const BASE_URL = "http://192.168.0.9/SeaSmart/api/services/public";

const fetchData = async (service, action, data = null) => {
    const url = `${BASE_URL}/${service}.php?action=${action}`;

    const options = {
        method: data ? 'POST' : 'GET',
        
    };

    if (data) {
        options.body = data;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Parsear la respuesta como JSON
        return result; // Devolver el JSON de la respuesta
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default fetchData;