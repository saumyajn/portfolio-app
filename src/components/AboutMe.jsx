import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import LuggageTwoToneIcon from '@mui/icons-material/LuggageTwoTone';
import DinnerDiningTwoToneIcon from '@mui/icons-material/DinnerDiningTwoTone';
import { Card, CardContent, Chip, CardActionArea, CardMedia } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

const paintings = [
    { src: require('../images/paintings/IMG_6250.jpg'), title: 'Falling flowers' },
    { src: require('../images/paintings/IMG_7672.jpg'), title: 'Beautiful Tree' },
    { src: require('../images/paintings/IMG_2481.jpg'), title: 'Key to Paradise' },
    { src: require('../images/paintings/IMG_1.jpg'), title: 'Colorful Glass tree' },
    { src: require('../images/paintings/IMG_2241.jpg'), title: 'Watercolor chameleon' },
];

const chipData = [
    { key: 0, label: 'Painting', icon: <ColorLensTwoToneIcon /> },
    { key: 1, label: 'Music', icon: <LibraryMusicTwoToneIcon /> },
    { key: 2, label: 'Travel', icon: <LuggageTwoToneIcon /> },
    { key: 3, label: 'Cooking', icon: <DinnerDiningTwoToneIcon /> },
];

function PaintingCard({ src, title }) {
    return (
        <Card sx={{
            width: 180,
            m: 1,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        }}>
            <CardActionArea>
                <CardMedia component="img" sx={{ height: 180 }} image={src} alt={title} />
            </CardActionArea>
        </Card>
    );
}

export default function AboutMe() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            id="about"
            sx={{
                minHeight: '100vh',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    p: { xs: 2, md: 4 },
                    m: { xs: 2, md: 4 },
                    width: '100%',
                    // maxWidth: '1200px',
                }}
            >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            mb: 3,
                            fontFamily: 'Poppins, sans-serif',
                            color: 'text.primary',
                            textAlign: 'center',
                        }}
                    >
                        About Me
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            maxWidth: '1200px',
                            color: 'text.secondary',
                            textAlign: 'justify',
                            lineHeight: 1.6,
                        }}
                    >
                        Frontend developer and painter passionate about creating beautiful user experiences.
                        I specialize in building scalable UI applications with Angular and React, blending performance and design.
                        Creativity flows both into my code and my canvas.
                        With a strong focus on clean architecture and responsive design, I strive to build applications that are both intuitive and efficient.
                        Beyond coding, my background in visual arts fuels my attention to detail, helping me craft interfaces that not only work great but feel great to use.
                        I’m always eager to learn, explore new technologies, and turn innovative ideas into polished digital solutions.

                    </Typography>

                    <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                        {chipData.map(({ key, label, icon }) => (
                            <Chip
                                key={key}
                                icon={icon}
                                label={label}
                                variant="outlined"
                                sx={{
                                    fontWeight: 'bold',
                                    color: isDarkMode ? '#fff' : '#333',
                                    borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                                }}
                            />
                        ))}
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Box sx={{ width: { xs: 300, sm: 500, md: 600 } }}>
                            <Carousel
                                fullHeightHover
                                indicators={false}
                                navButtonsAlwaysVisible
                                animation="slide"
                                autoPlay={true}
                                interval={4000}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {paintings.map(({ src, title }, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <PaintingCard src={src} title={title} />
                                    </Box>
                                ))}
                            </Carousel>
                        </Box>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    );
}
