import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent, Chip, Stack, IconButton, useTheme } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

// Icons for your specific skills
import CodeIcon from '@mui/icons-material/Code'; // For React/Web
import TerminalIcon from '@mui/icons-material/Terminal'; // For Python/Backend
import BrushIcon from '@mui/icons-material/Brush'; // For Art/Design

import myImage from '../images/myimg1.png';

export default function Home() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: '90vh', // Increased height for a full "Hero" feel
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'start',
                px: { xs: 2, md: 4 },
                pt: { xs: 10, md: 0 }, // Add padding on mobile to clear the header
            }}
        >
            <Card
                sx={{
                    // Professional Glassmorphism
                    backdropFilter: 'blur(16px)',
                    backgroundColor: isDarkMode ? 'rgba(30, 30, 40, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '24px',
                    boxShadow: isDarkMode 
                        ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)' 
                        : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    maxWidth: '1200px',
                    width: '100%',
                    overflow: 'visible', // Allows the glow effect to bleed out
                    p: { xs: 2, md: 5 },
                }}
            >
                <CardContent>
                    <Stack 
                        direction={{ xs: 'column-reverse', md: 'row' }} 
                        spacing={6} 
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        
                        {/* LEFT SIDE: Text Content */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            
                            {/* "Eyebrow" Text */}
                           
                            
                            {/* Main Headline */}
                            <Typography
                                variant="h2" // Uses Quicksand from your theme
                                sx={{
                                    mb: 2,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    lineHeight: 1.2,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Hi, I'm Saumya.
                            </Typography>

                            <Typography
                                variant="h5" // Uses Quicksand
                                sx={{
                                    mb: 3,
                                    color: theme.palette.text.secondary,
                                    fontWeight: 500
                                }}
                            >
                                Developer <span style={{ color: theme.palette.primary.main }}>|</span> Artist <span style={{ color: theme.palette.primary.main }}>|</span> Learner
                            </Typography>

                            {/* SKILLS SECTION (New) */}
                            <Stack 
                                direction="row" 
                                spacing={1} 
                                justifyContent={{ xs: 'center', md: 'flex-start' }}
                                sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}
                            >
                                <Chip icon={<CodeIcon />} label="React & Next.js" variant="outlined" />
                                <Chip icon={<TerminalIcon />} label="Python & Firebase" variant="outlined" />
                                <Chip icon={<BrushIcon />} label="UI/UX Design" variant="outlined" />
                            </Stack>

                            {/* Description - Shortened & Scannable */}
                            <Typography
                                variant="body1" // Uses Inter from your theme
                                sx={{
                                    mb: 4,
                                    maxWidth: '600px',
                                    color: theme.palette.text.secondary,
                                    fontSize: '1.1rem',
                                    mx: { xs: 'auto', md: 0 }
                                }}
                            >
                                I build performant web experiences that blend <strong>technical skill</strong> with <strong>artistic creativity</strong>. 
                                Currently focused on scalable applications and exploring new tech like Python and AI.
                            </Typography>

                            {/* Call to Actions */}
                            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Button 
                                    variant="contained" 
                                    href="#projects" 
                                    size="large"
                                    sx={{ borderRadius: '50px', px: 4 }}
                                >
                                    View Projects
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    href="/Saumya_Jain_resume.pdf" 
                                    size="large"
                                    sx={{ borderRadius: '50px', px: 4 }}
                                >
                                    Resume
                                </Button>
                            </Stack>

                            {/* Social Icons */}
                            <Stack direction="row" spacing={1} sx={{ mt: 4 }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <IconButton href="https://github.com/saumyajn" target="_blank" color="inherit">
                                    <GitHubIcon />
                                </IconButton>
                                <IconButton href="https://linkedin.com/in/saumyajn" target="_blank" color="primary">
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton href="mailto:your-email@example.com" color="secondary">
                                    <EmailIcon />
                                </IconButton>
                            </Stack>
                        </Box>

                        {/* RIGHT SIDE: Image with Unique Glow */}
                        <Box sx={{ position: 'relative' }}>
                            {/* The "Glow" Effect */}
                            <Box sx={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '90%', height: '90%',
                                background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, rgba(0,0,0,0) 70%)`,
                                filter: 'blur(60px)',
                                opacity: 0.4,
                                zIndex: 0
                            }} />
                            
                            <Avatar 
                                src={myImage} 
                                alt="Saumya" 
                                sx={{ 
                                    width: { xs: 200, md: 340 }, 
                                    height: { xs: 200, md: 340 }, 
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                                    border: `4px solid ${theme.palette.background.paper}`,
                                    position: 'relative',
                                    zIndex: 1
                                }} 
                            />
                        </Box>

                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}