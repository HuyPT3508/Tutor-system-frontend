// src/services/apiClient.js

import axios from 'axios';

// Đọc biến môi trường từ file .env
// Note: Vite yêu cầu prefix VITE_ cho các biến môi trường
const baseURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Bạn sẽ thêm logic đính kèm Access Token vào đây (Sau này, khi làm Bước F2)
/*
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
*/

export default apiClient;