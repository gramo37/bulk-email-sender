// src/axios/axiosInstance.ts
import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Add any custom headers or logging here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export default axiosInstance;
