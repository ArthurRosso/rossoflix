import axios from 'axios';

const api = axios.create({ 
    baseURL: " https://tv-v2.api-fetch.website/" 
});

export default api;