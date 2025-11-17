// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import authService from '../services/authService'; // Cần import authService để gọi logout

// 1. Khởi tạo Context
const AuthContext = createContext();

// Hàm tiện ích: Khôi phục trạng thái từ Local Storage khi ứng dụng khởi động
const getInitialState = () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Nếu có token, cấu hình Axios để sử dụng nó ngay lập tức
    if (token) {
        // Cấu hình header Authorization mặc định cho mọi request
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return {
        isAuthenticated: !!token,
        accessToken: token,
        user: user || null,
        isLoading: true // Trạng thái tải ban đầu
    };
};

// 2. Auth Provider Component
export const AuthContextProvider = ({ children }) => {
    const [state, setState] = useState(getInitialState);

    // Hàm Đăng nhập: Lưu token và user data
    const login = (accessToken, user) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Cấu hình Header cho Axios
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        setState(prevState => ({
            ...prevState,
            isAuthenticated: true,
            accessToken,
            user,
        }));
    };

    // Hàm Đăng xuất: Xóa token local VÀ gọi API Backend để hủy Refresh Token
    const logout = async () => {
        try {
            // Gửi yêu cầu xóa Refresh Token đến Backend
            await authService.logout(); 
        } catch (error) {
            // Dù API fail, vẫn phải xóa token cục bộ
            console.error("Logout API failed, but clearing local storage.", error);
        }

        // Xóa khỏi localStorage và State (Client-side cleanup)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        delete apiClient.defaults.headers.common['Authorization'];

        setState(prevState => ({
            ...prevState,
            isAuthenticated: false,
            accessToken: null,
            user: null,
        }));
    };
    
    // Hoàn tất Loading sau khi kiểm tra Local Storage
    useEffect(() => {
        setState(prevState => ({ ...prevState, isLoading: false }));
    }, []);

    const contextValue = {
        ...state,
        login,
        logout,
    };

    // Chỉ render ứng dụng khi Context đã hoàn tất việc kiểm tra trạng thái ban đầu
    return (
        <AuthContext.Provider value={contextValue}>
            {!state.isLoading && children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook tiện ích để sử dụng Context
export const useAuth = () => useContext(AuthContext);