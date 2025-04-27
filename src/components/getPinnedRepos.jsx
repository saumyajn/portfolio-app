import { Button, CardActionArea, CardContent, Grid, Link, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import Carousel from 'react-material-ui-carousel'
import { BallTriangle } from 'react-loader-spinner'
import styles from '../styles/header.module.css'
function GitRepoCard({ repo }) {

    return (
        <Card sx={{
            width: { xs: 300, sm: 500 }, height: 200, justifyContent: "center", padding: '5px', background: '#ffffff30'

        }}>
            <CardContent>
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }} component="div">
                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" color='#ceedc2'>{repo.name}</Link>

                    <Button sx={{ textAlign: 'right', color: '#c2c7c2' }}>{repo.homepage ? <OpenInNewTwoToneIcon /> : ''}
                    </Button>
                </Typography>

                <Typography variant="body" >{repo.description}</Typography>

            </CardContent>
            <br />
            <CardActionArea>
                <Grid container sx={{ textAlign: 'center' }}>
                    <Grid item xs={6}>   <Typography variant='body1' sx={{ textTransform: 'uppercase', marginRight: 2 }}>{(repo.topics)}
                    </Typography>
                    </Grid><Grid item xs={6}> <Typography variant="body1" >
                        {new Date(repo.pushed_at).toLocaleDateString()}
                    </Typography>
                    </Grid>
                </Grid>

            </CardActionArea>
        </Card>
    )

}
export function PinnedRepos({ username }) {
    const [isLoading, setIsLoading] = useState(true);


    const [repos, setRepos] = useState([]);
    useEffect(() => {
        async function fetchPinnedRepos() {
            try {
                fetch(`https://api.github.com/users/${username}/starred?sort=updated`)
                    .then((res) => res.json())
                    .then(data => {
                        setRepos(data); setIsLoading(false);


                    }).catch(err => {
                        throw new Error('Failed to fetch pinned repos' + err);
                    })


            } catch (error) {
                console.error('Error fetching pinned repos:', error);
            }
        }

        fetchPinnedRepos();
    }, [username]);

    return (
        <div> {isLoading ?
            <div className={styles.loader}><BallTriangle

                height={100}
                width={150}
                radius={4}
                color="#fff"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> </div> : null}

            <Carousel fullHeightHover={false} animation='slide' interval='5000' duration='800'>
                {repos.map((repo, index) => (
                    <Grid key={index} container sx={{
                        justifyContent: "center",
                        alignContent: 'center',
                        alignItems: 'center',

                    }} >
                        <GitRepoCard repo={repo} />
                    </Grid>
                ))}

            </Carousel>
        </div>
    )
}