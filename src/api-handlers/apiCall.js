import axios from "axios";

const baseURL = 'http://localhost:8888/';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default axiosInstance;
