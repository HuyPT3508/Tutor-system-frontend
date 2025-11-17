// src/pages/ProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Button, 
    CircularProgress,
    Alert 
} from '@mui/material';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!user) {
                    setError("Không tìm thấy thông tin đăng nhập.");
                    setLoading(false);
                    return;
                }
                
                const response = await authService.getMe();
                setProfileData(response.data); 

            } catch (err) {
                setError("Không thể tải hồ sơ. Vui lòng thử đăng nhập lại.");
                console.error("Fetch profile failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]); 

    const renderProfileDetails = () => {
        if (!profileData) return null;
        
        const role = profileData.roles?.[0]?.role_name; 
        
        const specificProfile = role === 'student' 
            ? profileData.student_profile 
            : (role === 'tutor' ? profileData.tutor_profile : null);

        if (!specificProfile) return null;

        return (
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Thông tin Hồ sơ ({role === 'student' ? 'Học sinh' : 'Gia sư'})
                </Typography>
                
                {role === 'student' && (
                    <>
                        <Typography>Lớp: {specificProfile.class_name}</Typography>
                        <Typography>GPA: {specificProfile.gpa}</Typography>
                    </>
                )}
                
                {role === 'tutor' && (
                    <>
                        <Typography>Chuyên ngành: {specificProfile.specialty}</Typography>
                        <Typography>Vị trí: {specificProfile.position}</Typography>
                        <Typography>Là Giảng viên: {specificProfile.is_faculty ? 'Có' : 'Không'}</Typography>
                    </>
                )}
                
                {/* Ở Giai đoạn sau sẽ thêm form chỉnh sửa */}
            </Box>
        );
    };

    if (loading) {
        return (
            <Container sx={{ mt: 8, textAlign: 'center' }}>
                <CircularProgress />
                <Typography>Đang tải hồ sơ...</Typography>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="h1" variant="h4">
                        Hồ sơ Cá nhân
                    </Typography>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={logout}
                    >
                        Đăng Xuất
                    </Button>
                </Box>
                
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                {/* Thông tin User chung */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" color="primary">{profileData?.full_name || user?.full_name || 'Tên Người Dùng'}</Typography>
                    <Typography>Username: {profileData?.username || user?.username}</Typography>
                    <Typography>Email: {profileData?.email || user?.email}</Typography>
                    <Typography>Số điện thoại: {profileData?.phone_num || user?.phone_num}</Typography>
                </Box>
                
                {/* Chi tiết Hồ sơ (Student/Tutor) */}
                {renderProfileDetails()}

                {/* Form Chỉnh Sửa Profile sẽ được thêm vào đây ở bước sau */}
            </Paper>
        </Container>
    );
};

export default ProfilePage;