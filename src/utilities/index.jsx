import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, useTheme, Grid, Divider, Chip, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import TerminalIcon from '@mui/icons-material/Terminal';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AppsIcon from '@mui/icons-material/Apps';
import BoltIcon from '@mui/icons-material/Bolt';

// Components
import PythonWidget from './PythonWidget';
import { APPS_CONFIG } from './appConfig';

// Definition for larger Apps (Routing to new pages)
const FULL_APPS = [
    {
        id:'treasure_island',
        title: 'Treasure Island',
        description: 'An interactive text-based adventure game where you make choices to find the treasure.',
        path: '/python/treasure-island',
        icon: <SportsEsportsIcon fontSize="large" sx={{ color: 'white' }} />,
        color: '#43a047',   

    },
    {
        id: 'hangman',
        title: 'Hangman',
        description: 'Coming SOON! Classic word guessing game.',
        // path: '/python/hangman',
        icon: <SportsEsportsIcon fontSize="large" sx={{ color: 'white' }} />,
        color: '#ff7043',
    },
];

export default function PythonHub() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', pt: 12, px: { xs: 2, md: 8 }, pb: 8 }}>

            {/* 1. Header */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Quicksand', fontWeight: 700, mb: 2 }}>
                    Python Utility Lab
                </Typography>
                <Typography color="text.secondary">
                    Run real Python code directly in your browser.
                </Typography>
            </Box>

            {/* 2. SECTION: Quick Utilities (Your Tabbed Widget) */}
            <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 10 }}>
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

            {/* 3. SECTION: Full Applications (Cards) */}
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
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
                                <CardActionArea onClick={() => navigate(app.path)} sx={{ height: '100%' }}>
                                    <Box sx={{
                                        height: 100,
                                        background: `linear-gradient(135deg, ${app.color} 0%, #d84315 100%)`,
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

        </Box>
    );
}