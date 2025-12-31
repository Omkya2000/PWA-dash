import React,{useState} from 'react';
import {
    Box,Card,CardContent,Typography,TextField,Button,IconButton,InputAdornment,
    Link,CircularProgress
} from '@mui/material'

import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import logo from '../../assets/logo.png';

interface LoginCardProps{
    onLogin:(userId:string,pass:string)=>void;
    isLoading:boolean;
}

const LoginCard:React.FC<LoginCardProps>=({onLogin,isLoading})=>{
    const [userId,setUserId]=useState('')
    const [password,setPassword]=useState('')
    const [showPassword,setShowPassword]=useState(false)

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(userId, password);
    };

    return(
        <Card sx={{
            width:'100%',
            maxWidth:400,
            borderRadius:1,
            boxShadow:'0 4px 20px rgba(0,0,0,0.08)',
            background:'#ffffff',
            p:2
        }}>
            <CardContent sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                <Box 
                component='img'
                src={logo}
                sx={{width:120,height:70,mb:1,objectFit:'contain'}}
                />
                    <Typography variant='h6' sx={{fontWeight:700,color:'#333',mb:4,textAlign:'center'}}> Employee Information System</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    {/* User ID Field */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 0.5, color: '#999', fontSize: '0.85rem' }}>
                            User ID
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#f8f8f8',
                                    '& fieldset': { border: 'none' },
                                    height: 45,
                                    fontSize: '0.9rem',
                                    borderRadius: 1
                                }
                            }}
                        />
                    </Box>

                    {/* Password Field */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="body2" sx={{ color: '#999', fontSize: '0.85rem' }}>
                                Password
                            </Typography>
                            <Link
                                href="#"
                                variant="caption"
                                sx={{ color: '#999', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                            >
                                Forgot Password?
                            </Link>
                        </Box>
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#f8f8f8',
                                    '& fieldset': { border: 'none' },
                                    height: 45,
                                    fontSize: '0.9rem',
                                    borderRadius: 1
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: '#ccc' }}
                                            >
                                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    </Box>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            bgcolor: '#e85232',
                            '&:hover': { bgcolor: '#d14528' },
                            height: 48,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            boxShadow: 'none',
                            '&:active': { boxShadow: 'none' }
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Log In'
                        )}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}
export default LoginCard;