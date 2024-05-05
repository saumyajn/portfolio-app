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
        <Box sx={{ height: { xs: '100%', sm: "100vh" }, textAlign: 'center' }}>
            <h3>ABOUT ME</h3>
            <Paper sx={{ display: 'flex' }} style={{ backgroundColor: '#ffffff30', padding: '3px', margin: '3px' }}>
                <h4 sx={{ textAlign: 'justify' }}>
                    Full Stack developer (MEAN) with 4 years of experience in  conceptualizing, designing, and coding technical solutions using UI, Java and NodeJS technology stacks</h4>
            </Paper>
            <h3>My Interests</h3>
            <Paper sx={{ display: 'flex' }} style={{ backgroundColor: 'transparent', margin: '0 25%', padding: '10px', listStyle: 'none', width: 'fit-content', alignContent: 'center' }} component='ul'>

                {chipData.map((data) => {
                    return (
                        <li style={{ padding: '0 10px' }} key={data.key}>
                            <Chip icon={data.icon}
                                label={data.label} color='primary' />
                        </li>
                    )
                })}
            </Paper>

            <h4>Area of expertise</h4>
            <Grid container sx={{ padding: '5px' , margin:'0'}} columnSpacing={{ xs: 2 }}>
                <Grid item xs={4} >
                    <Item component='ul' sx={{ listStyle: 'none', marginTop: '-15px', backgroundColor: 'transparent', }}>{frontVal.map((data) => {
                        return <li key={data}>{data}</li>
                    })}</Item>
                </Grid>
                <Grid item xs={4}>

                    <Item component='ul' sx={{ listStyle: 'none', marginTop: '-15px', backgroundColor: 'transparent', }}>{otherVal.map((data) => {
                        return <li key={data}>{data}</li>
                    })}</Item>
                </Grid>
                <Grid item xs={4}>

                    <Item component='ul' sx={{ listStyle: 'none', marginTop: '-15px', backgroundColor: 'transparent', }}>{profVal.map((data) => {
                        return <li key={data}>{data}</li>
                    })}</Item>
                </Grid>
            </Grid>

        </Box>



    </div>)
}