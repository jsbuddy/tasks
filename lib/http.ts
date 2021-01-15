import axios from "axios";

const http = axios.create({
    baseURL: ''
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (err) => {
    console.log('Axios error', err)
})

export default http;