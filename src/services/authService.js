// src/services/authService.js

import apiClient from './apiClient';

/**
 * Gửi yêu cầu Đăng nhập đến Backend
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {Promise<any>} - Dữ liệu User, Access Token và Refresh Token từ Backend
 */
const login = (username, password) => {
    return apiClient.post('/auth/login', {
        username,
        password,
    });
};

/**
 * Gửi yêu cầu lấy thông tin hồ sơ của User hiện tại
 * @returns {Promise<any>} - Dữ liệu hồ sơ người dùng (bao gồm StudentProfile/TutorProfile)
 */
const getMe = () => {
    // apiClient đã được cấu hình để tự động gửi token (sẽ làm ở Bước F2)
    return apiClient.get('/users/me');
};


// Export các hàm để sử dụng trong các Component React
export default {
    login,
    getMe,
    // refresh: refreshAccessToken, // (Sẽ thêm sau)
    // logout: logoutApiCall, // (Sẽ thêm sau)
};