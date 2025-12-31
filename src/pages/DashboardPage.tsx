import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
   
    Drawer,
    IconButton,
} from '@mui/material';
import {
    LogOut,
    MoreVertical,
    Menu as MenuIcon,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import type { UserData } from '../types/user';

import PersonalData from '../components/Dashboard/PersonalData';


import eventIcon from '../assets/event.png';
import communicationIcon from '../assets/communication.png';
import calendarIcon from '../assets/calendar_view_month.png';
import searchIcon from '../assets/person_search.png';
import claimsIcon from '../assets/clinical_notes.png';
import trainingIcon from '../assets/man.png';
import itDecIcon from '../assets/edit_note.png';
import bankIcon from '../assets/account_balance.png';
import inboxIcon from '../assets/inbox.png';

const DRAWER_WIDTH = 300;


const SidebarIcon = ({ src }: { src: string }) => (
    <Box
        component="img"
        src={src}
        sx={{
            width: 24,
            height: 24,
            objectFit: 'contain',
            
        }}
    />
);

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('Employee User');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userData, setUserData] = React.useState<UserData | null>(null);
    const [currentView, setCurrentView] = React.useState<'welcome' | 'personalData'>('welcome');

    /*the personalized state without requiring a fresh login on page reload.*/
    React.useEffect(() => {
        const storedName = localStorage.getItem('user_name');
        const storedAvatar = localStorage.getItem('user_avatar');
        const storedData = localStorage.getItem('user_data');
        if (storedName) setUserName(storedName);
        if (storedAvatar) setUserAvatar(storedAvatar);
        if (storedData) setUserData(JSON.parse(storedData));
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    /*Clears sensitive user identifiers from local storage and routes back to login.*/
    const handleLogout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_avatar');
        localStorage.removeItem('user_data');
        navigate('/');
    };

    const menuItems = [
        { id: 'personalData', text: 'My Personal Data', icon: <SidebarIcon src={eventIcon} /> },
        { id: 'communication', text: 'My communication', icon: <SidebarIcon src={communicationIcon} /> },
        { id: 'calendar', text: 'Display Holiday Calendar', icon: <SidebarIcon src={calendarIcon} /> },
        { id: 'lookup', text: 'Employee Lookup', icon: <SidebarIcon src={searchIcon} /> },
        { id: 'claims', text: 'Claims', icon: <SidebarIcon src={claimsIcon} /> },
        { id: 'training', text: 'My Training', icon: <SidebarIcon src={trainingIcon} /> },
        { id: 'itDec', text: 'IT Declaration', icon: <SidebarIcon src={itDecIcon} /> },
        { id: 'bank', text: 'My Bank Details', icon: <SidebarIcon src={bankIcon} /> },
        { id: 'commData', text: 'My Communication Data', icon: <SidebarIcon src={inboxIcon} /> },
        { id: 'more', text: 'More Options', icon: <MoreVertical size={20} /> },
    ];

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo Area */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', position: 'relative', cursor: 'pointer' }} onClick={() => setCurrentView('welcome')}>
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{ width: 120, height: 70, objectFit: 'contain' }}
                />
                <IconButton
                    onClick={(e) => { e.stopPropagation(); handleDrawerToggle(); }}
                    sx={{ display: { sm: 'none' }, position: 'absolute', right: 8, top: 8 }}
                >
                    <X size={20} />
                </IconButton>
            </Box>

            <List sx={{ px: 1, flexGrow: 1, mt: 2, gap: 4 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={currentView === item.id}
                            sx={{
                                borderRadius: '8px',
                                color: '#5D7285',
                                '&:hover': { bgcolor: '#f5f7fa' },
                                '&.Mui-selected': {
                                    bgcolor: '#fff0ef',
                                    color: '#e85232',
                                    '& .MuiListItemIcon-root': { color: '#e85232' }
                                },
                                py: 1.2
                            }}
                            onClick={() => {
                                if (item.id === 'personalData') setCurrentView('personalData');
                                if (mobileOpen) handleDrawerToggle();
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                slotProps={{
                                    primary: {
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        lineHeight: '100%',
                                        letterSpacing: '0.002em',
                                        color: 'inherit',
                                        whiteSpace: 'nowrap'
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

           

            {/* Logout at bottom */}
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: '8px',
                        color: '#5D7285',
                        '&:hover': { bgcolor: '#fff0f0', color: '#d32f2f' }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        slotProps={{
                            primary: {
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: '100%',
                                letterSpacing: '0.002em',
                                whiteSpace: 'nowrap'
                            }
                        }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f0f2f5' }}>
            {/* Responsive Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                >
                    {drawerContent}
                </Drawer>
                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: '1px solid #e0e0e0' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        height: 64,
                        bgcolor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: { xs: 2, sm: 4 },
                        borderBottom: '1px solid #e0e0e0',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1100
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#455a64' }}
                    >
                        <MenuIcon size={24} />
                    </IconButton>

                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto', cursor: 'pointer' }}
                        onClick={() => setCurrentView('personalData')}
                    >
                        <Typography variant="body2" sx={{ color: '#546e7a', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                            {userName}
                        </Typography>
                        <Avatar
                            src={userAvatar}
                            sx={{
                                bgcolor: '#eceff1',
                                color: '#455a64',
                                width: 32,
                                height: 32,
                                fontSize: '0.875rem',
                                fontWeight: 700
                            }}
                        >
                            {userName.charAt(0)}
                        </Avatar>
                    </Box>
                </Box>

                {/* Page Content Holder */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 4 },
                        bgcolor: '#f5f7f9',
                        width: '100%'
                    }}
                >
                    {currentView === 'welcome' ? (
                        <Box />
                    ) : (
                        <PersonalData userName={userName} userAvatar={userAvatar} userData={userData} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardPage;
