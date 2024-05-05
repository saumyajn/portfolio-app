import Box from '@mui/material/Box';
import * as React from 'react';
import CardActionsArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid'
import Carousel from 'react-material-ui-carousel'
import CardMedia from '@mui/material/CardMedia';
import Card from "@mui/material/Card";
import chameleon from '../images/paintings/IMG_2241.jpg';
import paradise from '../images/paintings/IMG_2481.jpg';
import yinyang from '../images/paintings/IMG_5845.jpg';
import flowerHead from '../images/paintings/IMG_6239.jpg';
import flowerBed from '../images/paintings/IMG_6250.jpg';
import peacock from '../images/paintings/IMG_6255.jpg';
import door from '../images/paintings/IMG_6353.jpg';
import ladyinRed from '../images/paintings/IMG_7241.jpg';
import umbrella from '../images/paintings/IMG_7383.jpg';
import tree from '../images/paintings/IMG_7672.jpg'
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
const cards = [
    [{
        path: chameleon, title: 'Watercolor chameleon'
    }, {
        path: paradise, title: 'Key to Paradise',

    }, {
        path: yinyang, title: "Yin Yang"
    }, {
        path: flowerHead, title: 'Flower Head'
    }],
    [{
        path: flowerBed, title: 'Falling flowers',
    }, {
        path: peacock, title: "Peacock"
    }, {
        path: ladyinRed, title: 'Lady in Red'
    }, {
        path: umbrella, title: 'Colorful Umbrella',
    }], [{
        path: door, title: 'New Door',
    }, {
        path: tree, title: "Beautiful Tree"
    }]
]
function ImageItem(props) {

    return (
        <div> <Grid container sx={{
            display: 'flex',
            flexDirection: "row",
            justifyContent: "center",
            alignContent: 'center',
            alignItems: 'center',

        }} >
            {props.itemName.map((item, id) => (
                <Grid item xs={3} key={id} >

                    <Card sx={{ width: 200, justifyContent: "center", padding: '2px', margin: '2px', }}> <CardActionsArea>
                        <CardMedia sx={{ height: 200 }} image={item.path} title={item.title} />
                    </CardActionsArea>
                    </Card>
                </Grid>
            ))}  </Grid>
        </div>
    )
}

function GithubList(props) {
return (
    <div>
        PROJECTS
        <Card></Card>
    </div>
)
}
export default function Projects() {
    return (<div>
        <Box sx={{ height: '100vh', textAlign: 'left', alignItems: 'center', justifyContent: "center" }}>
            <h3>PASSION</h3>
            Github projects
            <GithubList/>
            <h4>My paintings</h4>
            <Carousel fullHeightHover={true}  >
                {cards.map((val, i) => (

                    <ImageItem key={i} itemName={val} />


                ))}
            </Carousel>
        </Box>
    </div>)
}