import React from 'react';
import { Box, Typography, Chip, useTheme, Grid, Stack } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ColorLensIcon from '@mui/icons-material/ColorLens';

// Import your images (Keep your existing imports)
import img6250 from '../images/paintings/IMG_6250.jpg';
import img7672 from '../images/paintings/IMG_7672.jpg';
// ... other imports
import IMG_1 from '../images/paintings/IMG_1.jpg';
import IMG_2 from '../images/paintings/IMG_2.jpg';

const paintings = [
    { src: img6250, title: 'Falling flowers' },
    { src: img7672, title: 'Beautiful Tree' },
    { src: IMG_1, title: 'Abstract Colors' },
    { src: IMG_2, title: 'Nature\'s Embrace' },
];

export default function AboutMe() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box id="about" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 10, px: { xs: 2, md: 8 } }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                <Grid container spacing={8} alignItems="center">
                    
                    {/* LEFT: The Story */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
                            BEYOND THE CODE
                        </Typography>
                        <Typography variant="h3" sx={{ mb: 3, fontFamily: 'Quicksand', fontWeight: 700 }}>
                            The Artist & The Engineer
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                            I believe the best digital experiences are born where logic meets creativity.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7, color: 'text.secondary' }}>
                            As a developer, I architect scalable frontend systems using <strong>React</strong> and <strong>Angular</strong>. 
                            But when I step away from the keyboard, I pick up the brush. My background in traditional painting 
                            gives me a unique eye for color theory, composition, and detail that I bring back into every UI design.
                        </Typography>

                        <Stack direction="row" gap={1} flexWrap="wrap">
                            <Chip icon={<ColorLensIcon />} label="Acrylic Painting" variant="outlined" />
                            <Chip label="Digital Art" variant="outlined" />
                            <Chip label="UI Design" variant="outlined" />
                        </Stack>
                    </Grid>

                    {/* RIGHT: The Gallery (Floating without a card border looks more modern) */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ 
                            position: 'relative', 
                            '&:before': { // Decorative background blob
                                content: '""',
                                position: 'absolute',
                                top: -20, right: -20, bottom: -20, left: -20,
                                background: theme.palette.primary.main,
                                opacity: 0.1,
                                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                zIndex: 0
                            }
                        }}>
                            <Carousel 
                                animation="fade" 
                                indicators={false} 
                                navButtonsAlwaysVisible={true}
                                sx={{ borderRadius: 4, boxShadow: 5, position: 'relative', zIndex: 1 }}
                            >
                                {paintings.map((item, i) => (
                                    <Box key={i} component="img" src={item.src} alt={item.title} 
                                        sx={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                                    />
                                ))}
                            </Carousel>
                            <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }}>
                                A few of my original paintings
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    );
}