// src/utilities/index.jsx
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, useTheme, Grid, Divider, Chip, CardActionArea } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import AppsIcon from '@mui/icons-material/Apps';
import BoltIcon from '@mui/icons-material/Bolt';

import PythonWidget from './PythonWidget';
import { APPS_CONFIG } from './appConfig';

export default function PythonHub() {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', pt: 12, px: { xs: 2, md: 8 }, pb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Quicksand', fontWeight: 700, mb: 2 }}>
                    Python Utility Lab
                </Typography>
                <Typography color="text.secondary">
                    Run real Python code directly in your browser.
                </Typography>
            </Box>

            <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 10 }}>
                <Divider textAlign="left" sx={{ mb: 4 }}>
                    <Chip icon={<AppsIcon />} label="Interactive Games" color="secondary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                </Divider>

                <Grid container spacing={4}>
                    {/* The Arcade Link Card */}
                    <Grid item xs={12} sm={6} md={6}>
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
                                onClick={() => window.open('https://arcade-stack.vercel.app/', '_blank')} // Update with your actual Arcade URL
                                sx={{ height: '100%' }}
                            >
                                <Box sx={{
                                    height: 120,
                                    background: `linear-gradient(135deg, #9c27b0 0%, #dc7d60 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <AppsIcon sx={{ fontSize: 60, color: 'white' }} />
                                </Box>
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold">Arcade Room 🎮</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Looking for Python games like Treasure Island and Hangman? Head over to my dedicated React Arcade!
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
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
                        borderTopLeftRadius: 0,
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