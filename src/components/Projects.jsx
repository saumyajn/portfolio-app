import Box from '@mui/material/Box';
import * as React from 'react';
import CardActionsArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import LuggageTwoToneIcon from '@mui/icons-material/LuggageTwoTone';
import DinnerDiningTwoToneIcon from '@mui/icons-material/DinnerDiningTwoTone';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const paintings = [
    { src: require('../images/paintings/IMG_6250.jpg'), title: 'Falling flowers' },
    { src: require('../images/paintings/IMG_7672.jpg'), title: 'Beautiful Tree' },
    { src: require('../images/paintings/IMG_2481.jpg'), title: 'Key to Paradise' },
    { src: require('../images/paintings/IMG_6239.jpg'), title: 'Flower head' },
    { src: require('../images/paintings/IMG_2241.jpg'), title: 'Watercolor chameleon' },
    { src: require('../images/paintings/IMG_6353.jpg'), title: 'New Door' },
    { src: require('../images/paintings/IMG_7241.jpg'), title: 'Lady in Red' },
    { src: require('../images/paintings/IMG_1.jpg'), title: 'Colorful Glass tree' },
    { src: require('../images/paintings/IMG_7383.jpg'), title: 'Colorful Umbrella' },
    { src: require('../images/paintings/IMG_2.jpg'), title: 'Colorful Guitar' },
    { src: require('../images/paintings/IMG_3.jpg'), title: 'Colorful Melting Girl' },
    { src: require('../images/paintings/IMG_4.jpg'), title: 'Half butterfly' },
    { src: require('../images/paintings/IMG_5845.jpg'), title: 'Koi ying yang' },
    { src: require('../images/paintings/IMG_6255.jpg'), title: 'Peacock' }
];

const chipData = [
    { key: 0, label: 'Painting', icon: <ColorLensTwoToneIcon sx={{ color: '#2b8830' }} /> },
    { key: 1, label: 'Music', icon: <LibraryMusicTwoToneIcon sx={{ color: '#D310C4' }} /> },
    { key: 2, label: 'Travel', icon: <LuggageTwoToneIcon sx={{ color: '#1344BC' }} /> },
    { key: 3, label: 'Cooking', icon: <DinnerDiningTwoToneIcon sx={{ color: '#1344BC' }} /> }
];

function PaintingCard({ src, title }) {
    return (
        <Card sx={{ width: 200, justifyContent: 'center', p: 1, m: 1, boxShadow: 'inset 1px 1px 1px #349889, 0 0px 5px #fff' }}>
            <CardActionsArea>
                <CardMedia component="img" sx={{ height: 200 }} image={src} alt={title} />
            </CardActionsArea>
        </Card>
    );
}

function PaintingGroup({ group }) {
    return (
        <Grid id="projects" container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            {group.map(({ src, title }) => (
                <Grid item xs={12} sm={5} md={3} key={title}>
                    <PaintingCard src={src} title={title} />
                </Grid>
            ))}
        </Grid>
    );
}

export default function Projects() {
    const groupedPaintings = paintings.reduce((acc, curr, idx) => {
        const groupIndex = Math.floor(idx / 4);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(curr);
        return acc;
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', mt: { xs: '60px', sm: 0 }, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>PASSION PROJECTS</Typography>
            <Box>
                <Typography variant="h5">My Interests</Typography>
                <Paper sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, backgroundColor: 'transparent', m: '0 auto', width: 'fit-content', p: 2, justifyContent: 'center', alignItems: 'center' }}>
                    {chipData.map(({ key, label, icon }) => (
                        <Chip key={key} icon={icon} label={label} color="primary" sx={{ m: 1 }} />
                    ))}
                </Paper>
            </Box>

            <Box mt={4}>
                <Typography variant="h5">My paintings</Typography>
                <Carousel fullHeightHover>
                    {groupedPaintings.map((group, index) => (
                        <PaintingGroup key={index} group={group} />
                    ))}
                </Carousel>
            </Box>
        </Box>
    );
}