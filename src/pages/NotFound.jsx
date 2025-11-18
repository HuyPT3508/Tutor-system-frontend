// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Container sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
                Oops! Trang bạn tìm kiếm không tồn tại.
            </Typography>
            
            <Box>
                <Button 
                    variant="contained" 
                    component={Link} 
                    to="/"
                    sx={{ textTransform: 'none' }}
                >
                    Quay về Trang Chủ
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;