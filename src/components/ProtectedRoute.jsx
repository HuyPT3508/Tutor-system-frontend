// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
    // Lấy trạng thái xác thực và tải từ AuthContext
    const { isAuthenticated, isLoading } = useAuth(); 

    // 1. Nếu Context đang tải, trả về loading
    if (isLoading) {
        // 
        return <div>Loading...</div>; 
    }

    // 2. Nếu chưa đăng nhập, chuyển hướng về trang /login
    if (!isAuthenticated) {
        // 'replace' giúp thay thế entry hiện tại trong lịch sử trình duyệt
        return <Navigate to="/login" replace />; 
    }

    // 3. Nếu đã đăng nhập, hiển thị nội dung trang con (children)
    return children;
};

export default ProtectedRoute;