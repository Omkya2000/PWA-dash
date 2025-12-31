import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Avatar,
    Link,
    Divider,
} from '@mui/material';

import type { UserData } from '../../types/user';

interface PersonalDataProps {
    userName: string;
    userAvatar: string;
    userData: UserData | null;
}

const PersonalData: React.FC<PersonalDataProps> = ({ userName, userAvatar, userData }) => {
    /**
     * Logic: Mapping Backend (DummyJSON) schema to EIS Frontend Requirements.
     * We use optional chaining and logical ORs to provide safe fallbacks if the API 
     * returns partial data, ensuring the UI never breaks with "undefined".
     */
    const firstName = userData?.firstName || '';
    const lastName = userData?.lastName || '';
    const middleName = userData?.maidenName || '';
    const employeeId = userData?.id?.toString() || '';
    const department = userData?.company?.department || '';
    const costCenter = userData?.company?.name || '';

    // Helper to format date strings to DD.MM.YYYY
    const formatBirthDate = (dateStr?: string): string => {
        if (!dateStr) return '05.09.1986'; // Default fallback

        // If it's in YYYY-MM-DD format, split and reformat
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
        }

        // Fallback for other date formats (ISO, etc.)
        const date = new Date(dateStr);
        return Number.isNaN(date.getTime())
            ? '05.09.1986'
            : date.toLocaleDateString('en-GB').replaceAll('/', '.');
    };

    const birthDate = formatBirthDate(userData?.birthDate);

    const gender = userData?.gender || '';
    let title = '';
    if (gender) {
        if (gender.toLowerCase() === 'female') {
            title = 'MS.';
        } else {
            title = 'MR.';
        }
    }
    const state = userData?.address?.state || '';
    const city = userData?.address?.city || '';
    const country = userData?.address?.country || '';
    const nationality = userData?.address?.country || '';
    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="body2" sx={{ mb: 2, color: '#5D7285' }}>
                My Personal Data {!userData && '(Offline/Loading...)'}
            </Typography>

            {/* Top Profile Card */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    bgcolor: 'white',
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: 4
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        src={userAvatar}
                        sx={{ width: 140, height: 140, bgcolor: '#e2e8f0' }}
                    />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>
                            {userName} ({employeeId})
                        </Typography>
                        <Link href="#" sx={{ color: '#e85232', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                            Change Picture
                        </Link>
                    </Box>

                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{ color: '#5D7285' }}>
                                Organizational Unit : <span style={{ color: '#1e293b', fontWeight: 500 }}>{department}</span>
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{ color: '#5D7285' }}>
                                Cost Center : <span style={{ color: '#1e293b', fontWeight: 500 }}>{costCenter} ({employeeId}9)</span>
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{ color: '#5D7285' }}>
                                Manager Name : <span style={{ color: '#e85232', fontWeight: 600 }}></span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Detailed Info Section - Using Box to ensure no default Paper borders */}
            <Box
                sx={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    borderTop: 'none !important', // Explicitly kill the blue line
                    bgcolor: 'white',
                    boxShadow: 'none',
                    overflow: 'hidden',
                    mt: 3 // Add some space
                }}
            >
                <Box sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                        Valid From {birthDate}
                    </Typography>
                    <Divider sx={{ mb: 4 }} />

                    <Grid container spacing={6}>
                        {/* Name Column */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>Name</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <InfoRow label="Title" value={title} />
                                <InfoRow label="First Name" value={firstName.toUpperCase()} />
                                <InfoRow label="Last Name" value={lastName.toUpperCase()} />
                                <InfoRow label="Initials" value="" />
                                <InfoRow label="Nickname" value="" />
                            </Box>

                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 5, mb: 3, color: '#1e293b' }}>Other Personal Data</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <InfoRow label="Nationality" value={nationality} />
                                <InfoRow label="Second Nationality" value="" />
                                <InfoRow label="Third Nationality" value="" />
                                <InfoRow label="Language" value="" />
                                <InfoRow label="State" value={state} />
                                <InfoRow label="Religion" value="" />
                            </Box>
                        </Grid>

                        {/* Birth & Marital Column */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>Birth Data</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <InfoRow label="Date of Birth" value={birthDate} />
                                <InfoRow label="Name at Birth" value={middleName.toUpperCase()} />
                                <InfoRow label="Birthplace" value={city} />
                                <InfoRow label="Country of Birth" value={country} />
                                <InfoRow label="Gender" value={gender} />
                            </Box>

                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 5, mb: 3, color: '#1e293b' }}>Marital Status</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <InfoRow label="Marital Status" value="" />
                                <InfoRow label="Marital Status Since" value="" />
                                <InfoRow label="Number of Children" value="" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ minWidth: 150, color: '#5D7285', textAlign: 'right', pr: 2 }}>
            {label} :
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', textTransform: 'capitalize' }}>
            {value}
        </Typography>
    </Box>
);

export default PersonalData;
