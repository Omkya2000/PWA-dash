import React, { useState } from 'react';
import { Box, Container, Alert, Snackbar, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/Login/LoginCard';
import { loginUser } from '../services/api';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleLogin = async (userId: string, pass: string) => {
        setIsLoading(true);
        try {
            const data = await loginUser({ userId, password: pass });

            // Store user data for the dashboard
            if (data.user) {
                localStorage.setItem('user_data', JSON.stringify(data.user));
                localStorage.setItem('user_name', `${data.user.firstName} ${data.user.lastName}`);
                localStorage.setItem('user_avatar', data.user.image);
            }

            setNotification({
                open: true,
                message: 'Login successful! Redirecting...',
                severity: 'success',
            });

            // Redirect after a short delay to show the success message
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
            setNotification({
                open: true,
                message: errorMessage,
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f0f2f5',
                p: 3
            }}
        >
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
                <LoginCard onLogin={handleLogin} isLoading={isLoading} />
            </Container>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                slots={{ transition: Fade }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%', borderRadius: '12px' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
