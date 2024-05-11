import Box from '@mui/material/Box';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import LuggageTwoToneIcon from '@mui/icons-material/LuggageTwoTone';
import DinnerDiningTwoToneIcon from '@mui/icons-material/DinnerDiningTwoTone';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const frontVal = [
    'HTML',
    'CSS3',
    'Javascript / Typescript',
    'Angular / React',
    'Material UI',
    'Bootstrap',
    'Reactive Programming',
    'Website optimization'];
const otherVal = ['MongoDB',
    'NodeJS',
    'Express',
    'NPM, Bitbucket',
    'Jest, SonarQube',
    'Jenkins, RedHat',
    'Openshift Platform(OCP)',
    'RESTful web services'];
const profVal = [
    'Time Management',
    'Organization',
    'Attention to detail',
    'Communication skills',
    'Collaboration',
    'Adaptability',
    'Critical thinking',
    'Creativity'
]

export default function AboutMe() {

    const chipData = [
        {
            key: 0, label: 'Painting', icon: <ColorLensTwoToneIcon sx={{ color: '#2b8830' }} />
        },
        {
            key: 1, label: 'Music', icon: <LibraryMusicTwoToneIcon sx={{ color: '#D310C4' }} />
        },
        {
            key: 2, label: 'Travel', icon: <LuggageTwoToneIcon sx={{ color: '#1344BC ' }} />
        },
        {
            key: 3, label: 'Cooking', icon: <DinnerDiningTwoToneIcon sx={{ color: '#1344BC ' }} />
        }
    ];
    return (<div>
        <Box sx={{ height: { xs: '100%', sm: "100vh" }, textAlign: 'center', margin: '4px', marginTop: { xs: '60px', sm: '10px' } }}>

            <Paper elevation={6} style={{ backgroundColor: '#ffffff30', padding: '3px' }}>

                <h2 sx={{ textAlign: 'center' }}>ABOUT ME</h2>
                <Typography sx={{ textAlign: 'justify', margin: '5px' }} variant='body'>

                    Welcome! I'm Saumya Jain, a Senior Frontend Engineer with 4 years' experience. I specialize in crafting scalable UI solutions and driving team productivity. From revolutionizing microservices with Angular to optimizing user experiences, I bring innovation and leadership to every project. Let's build something remarkable together.</Typography>
            </Paper>
            <Box>
                <h3>My Interests</h3>
                <Paper sx={{ display: 'flex', flexDirection: {xs:'column',sm:'row' } ,backgroundColor: 'transparent', margin: '0 auto', width:'fit-content', padding: '10px', listStyle: 'none', justifyContent: 'center', alignContent: 'center' }} component='ul'>

                    {chipData.map((data) => {
                        return (
                            <li style={{ padding: '2px 10px' }} key={data.key}>
                                <Chip icon={data.icon}
                                    label={data.label} color='primary' />
                            </li>
                        )
                    })}
                </Paper>
            </Box>
            <Box>
                <h4 style={{ marginBottom: '0px' }}>Area of expertise</h4>
                <Grid container sx={{ padding: '5px', margin: '0' }} columnSpacing={{ xs: 2 }}>
                    <Grid item xs={12} sm={4} >
                        <Item component='ul' sx={{ listStyle: 'none', backgroundColor: 'transparent', }}>
                            {frontVal.map((data, index) => {
                                return <li key={index}>{data}</li>
                            })}</Item>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Item component='ul' sx={{ listStyle: 'none', backgroundColor: 'transparent', }}>
                            {otherVal.map((data, index) => {
                                return <li key={index}>{data}</li>
                            })}</Item>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Item component='ul' sx={{ listStyle: 'none', backgroundColor: 'transparent', }}>
                            {profVal.map((data, index) => {
                                return <li key={index}>{data}</li>
                            })}</Item>
                    </Grid>
                </Grid>

            </Box>
        </Box>


    </div>)
}