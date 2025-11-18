// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// KHÔNG cần import authService khi đang ở chế độ Mock
// import authService from '../services/authService'; 

import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Container, 
    Paper 
} from '@mui/material';

const LoginPage = () => {
    const { login } = useAuth(); 
    const navigate = useNavigate();

    // State quản lý Form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // ===============================================
            // BẮT ĐẦU PHẦN MOCK: THAY THẾ LỜI GỌI API THẬT
            // ===============================================
            
            // 1. Mô phỏng độ trễ (1 giây)
            await new Promise(resolve => setTimeout(resolve, 1000)); 

            // 2. Kiểm tra MOCK LOGIN (Mật khẩu PHẢI là '123' để thành công)
            if (password !== '123') {
                throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
            }
            
            // 3. Dữ liệu giả lập thành công
            const MOCK_ACCESS_TOKEN = "MOCK_STUDENT_JWT_TOKEN";
            const MOCK_USER = {
                user_id: "student-uuid-mock", 
                username: username,
                full_name: "Mock Student (Giả lập)",
                email: `${username}@mock.com`,
                phone_num: "0901234567",
                // Giả lập vai trò student để ProfilePage có thể render
                roles: [{ role_name: 'student' }] 
            };

            // 4. Cập nhật Context (Lưu token và user global)
            login(MOCK_ACCESS_TOKEN, MOCK_USER); 

            // 5. Chuyển hướng người dùng
            navigate('/profile', { replace: true });

        } catch (err) {
            // Xử lý lỗi giả lập
            const errorMessage = err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
        
        // ===============================================
        // KẾT THÚC PHẦN MOCK
        // ===============================================
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Đăng nhập Hệ thống Tutor
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Tên đăng nhập"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Mật khẩu (Gõ '123' để đăng nhập giả lập)"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {/* Hiển thị lỗi nếu có */}
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;