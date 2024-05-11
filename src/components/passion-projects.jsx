import Box from '@mui/material/Box';
import * as React from 'react';
import CardActionsArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid'
import Carousel from 'react-material-ui-carousel'
import CardMedia from '@mui/material/CardMedia';
import Card from "@mui/material/Card";

import colorfulTree from '../images/paintings/IMG_1.jpg';
import colorfulGuitar from '../images/paintings/IMG_2.jpg';
import colorfulGirl from '../images/paintings/IMG_3.jpg';
import butterfly from '../images/paintings/IMG_4.jpg';
import chameleon from '../images/paintings/IMG_2241.jpg';
import paradise from '../images/paintings/IMG_2481.jpg';
import yinyang from '../images/paintings/IMG_5845.jpg';
import flowerHead from '../images/paintings/IMG_6239.jpg';
import flowerBed from '../images/paintings/IMG_6250.jpg';
import peacock from '../images/paintings/IMG_6255.jpg';
import door from '../images/paintings/IMG_6353.jpg';
import ladyinRed from '../images/paintings/IMG_7241.jpg';
import umbrella from '../images/paintings/IMG_7383.jpg';
import tree from '../images/paintings/IMG_7672.jpg';
import { PinnedRepos } from '../services/getPinnedRepos';
import { Typography } from '@mui/material';
const cards = [
    [{
        path: flowerBed, title: 'Falling flowers',
    }, {
        path: tree, title: "Beautiful Tree"
    }, {
        path: paradise, title: 'Key to Paradise',

    },
    {
        path: flowerHead, title: "Flower head"
    }],
    [{
        path: chameleon, title: 'Watercolor chameleon'
    }, {
        path: door, title: 'New Door',
    }, {
        path: ladyinRed, title: 'Lady in Red'
    },
    ],
    [{
        path: colorfulTree, title: "Colorful Glass tree"
    }, {
        path: umbrella, title: 'Colorful Umbrella',
    }, {
        path: colorfulGuitar, title: "Colorful Guitar"
    }, {
        path: colorfulGirl, title: "Colorful Melting Girl"
    }],
    [{
        path: butterfly, title: 'Half butterfly',
    }, {
        path: yinyang, title: 'Koi ying yang',

    },
    {
        path: peacock, title: "Peacock"
    }]
]
function ImageItem(props) {

    return (
        <div> <Grid container sx={{
            display: 'flex',
            flexDirection: {xs:'column',sm:"row",},
            justifyContent: "center",
            alignContent: 'center',
            alignItems: 'center',
            textAlign: 'center',

        }} >
            {props.itemName.map((item, id) => (
                <Grid item xs={12} sm={5} md={3} key={id} >

                    <Card sx={{ width: 200, justifyContent: "center", padding: '4px', margin: '4px', boxShadow: 'inset 1px 1px 1px #349889,0 0px 5px #fff' }}> <CardActionsArea>
                        <CardMedia sx={{ height: 200 }} image={item.path} title={item.title} />
                    </CardActionsArea>
                    </Card>
                </Grid>
            ))}  </Grid>
        </div>
    )
}

export default function Projects() {

    const username = "saumyajn"
    return (<div>
        <Box sx={{ height: { xs: '100%', sm: "100%" }, marginTop: { xs: '60px', sm: '0px' }, textAlign: 'center', alignItems: 'center', justifyContent: "center" }}>
            <h2>PASSION PROJECTS</h2>
            <Box>
                <Typography variant='h5'>Github projects</Typography>
                <PinnedRepos username={username} />
            </Box>
            <br />
            <Box>
                <Typography variant='h5'>My paintings</Typography>
                <Carousel fullHeightHover={true}>
                    {cards.map((val, i) => (
                        <ImageItem key={i} itemName={val} />

                    ))}
                </Carousel>
            </Box>
        </Box>
    </div>)
}