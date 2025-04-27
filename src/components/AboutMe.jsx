import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {PinnedRepos } from './getPinnedRepos';
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


    const username = "saumyajn"
    return (
    <div>
        <Box id="about" sx={{ height: { xs: '100%', sm: "100vh" }, textAlign: 'center', margin: '4px', marginTop: { xs: '60px', sm: '10px' } }}>


            <Box>
                <Typography variant='h5'>Github projects</Typography>
                <PinnedRepos username={username} />
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