import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // ⭐ NEW
import myImage from '../images/myimg1.png';

export default function Home() {
    const theme = useTheme();  // ⭐ Use MUI theme
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'start',
                px: 2,
            }}
        >
            <Card
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderRadius: '20px',
                    minHeight: '60vh',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)', width: '100%',
                    p: { xs: 2, md: 4 },
                    m: { xs: 2, md: 4 },
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: { xs: 'center', md: 'left' },
                            gap: 6,
                            maxWidth: '1200px',
                            mx: 'auto',
                        }}
                    >
                        <Avatar src={myImage} alt="Saumya" sx={{ width: 250, height: 250, boxShadow: 4 }} />
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 2,
                                    fontFamily: 'Poppins, sans-serif',
                                    color: isDarkMode ? '#eee' : '#333',
                                }}
                            >
                                Hi, I'm Saumya 👋
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    maxWidth: '700px',
                                    color: isDarkMode ? '#ccc' : '#555',
                                    opacity: 0.9,
                                    mx: { xs: 'auto', md: '0' },
                                }}
                            >
                                Developer | Painter/Artist | Learner
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    maxWidth: '700px',
                                    color: isDarkMode ? '#bbb' : '#666',
                                    opacity: 0.95,
                                    mx: { xs: 'auto', md: '0' },
                                }}
                            >
                                I specialize in building delightful, performant, and accessible web experiences using modern technologies. My focus is on crafting scalable solutions, optimizing user journeys, and collaborating with teams to deliver impactful products. I am also passionate about painting and art, always seeking inspiration from creativity and colors. Always exploring new tools and best practices to stay ahead in the ever-evolving tech landscape.
                            </Typography>
                            <Button
                                variant="contained"
                                href="/Saumya_Jain_resume.pdf"
                                size="large"
                                sx={{
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    px: 4,
                                    py: 1.5,
                                    mr: 2,
                                    boxShadow: 3,
                                }}
                            >
                                View Resume
                            </Button>
                            <Button
                                variant="outlined"
                                href="#projects"
                                size="large"
                                sx={{
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    px: 4,
                                    py: 1.5,
                                    boxShadow: 3,
                                }}
                            >
                                See My Projects
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
