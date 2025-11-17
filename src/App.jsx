import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext.jsx"; // Thêm .jsx
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Thêm .jsx

// Sửa các dòng import Pages
import LoginPage from "/pages/LoginPage.jsx";      // <--- THÊM ĐUÔI FILE .jsx
import ProfilePage from "./pages/ProfilePage.jsx";  // <--- THÊM ĐUÔI FILE .jsx
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <AuthContextProvider> 
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<div>Trang Chủ Công Khai</div>} />
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Protected Routes: Áp dụng ProtectedRoute */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* Route 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;