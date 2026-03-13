import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, useTheme, Grid, Divider, Chip, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TerminalIcon from '@mui/icons-material/Terminal';
import AppsIcon from '@mui/icons-material/Apps';
import BoltIcon from '@mui/icons-material/Bolt';

import PythonWidget from './PythonWidget';
import { APPS_CONFIG } from './appConfig';
import { FULL_APPS } from './fullApps';

export default function PythonHub() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', pt: 12, px: { xs: 2, md: 8 }, pb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Quicksand', fontWeight: 700, mb: 2 }}>
                    Python Utility Labz
                </Typography>
                <Typography color="text.secondary">
                    Run real Python code directly in your browser.
                </Typography>
            </Box>

            <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 10 }}>
                <Divider textAlign="left" sx={{ mb: 4 }}>
                    <Chip icon={<AppsIcon />} label="Full Games & Apps" color="secondary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                </Divider>

                <Grid container spacing={4}>
                    {FULL_APPS.map((app) => (
                        <Grid item key={app.id} xs={12} sm={6} md={4}>
                            <Card
                                elevation={4}
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-5px)' }
                                }}
                            >
                                <CardActionArea
                                    onClick={() => {
                                        const isExternal = /^https?:\/\//i.test(app.path);
                                        if (isExternal) {
                                            window.open(app.path, '_blank');
                                        } else {
                                            navigate(app.path);
                                        }
                                    }}
                                    sx={{ height: '100%' }}
                                >
                                    <Box sx={{
                                        height: 100,
                                        background: `linear-gradient(135deg, ${app.color} 0%, #dc7d60 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {app.icon}
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">{app.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{app.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
                <Divider textAlign="left" sx={{ mb: 4 }}>
                    <Chip icon={<BoltIcon />} label="Quick Utilities" color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                </Divider>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 0 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        {APPS_CONFIG.map((app) => (
                            <Tab key={app.id} label={app.title} icon={<TerminalIcon fontSize="small" />} iconPosition="start" />
                        ))}
                    </Tabs>
                </Box>

                <Card
                    elevation={3}
                    sx={{
                        borderTopLeftRadius: 0, // Align with tabs
                        borderTopRightRadius: 4,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        minHeight: 400,
                        bgcolor: theme.palette.background.paper
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                            {APPS_CONFIG[currentTab].title}
                        </Typography>
                        {/* The Widget Logic */}
                        <PythonWidget
                            key={APPS_CONFIG[currentTab].id}
                            appConfig={APPS_CONFIG[currentTab]}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}