import { Button, CardActionArea, CardContent, Grid, Link, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import Carousel from 'react-material-ui-carousel'

function GitRepoCard({ repo }) {
    return (
        <Card sx={{
            width: 500, justifyContent: "center", padding: '3px', background: '#ffffff30'

        }}>
            <CardContent>
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }} component="div">
                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" color='#7fb782'>{repo.name}</Link>
                    <Button sx={{ textAlign: 'right', color: '#559f59' }}>{repo.homepage ? <OpenInNewTwoToneIcon /> : ''}</Button>
                </Typography>

                <Typography variant="body" >{repo.description}</Typography>

            </CardContent>
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
    const [repos, setRepos] = useState([]);
    useEffect(() => {
        async function fetchPinnedRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/starred?sort=updated`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pinned repos');
                }
                const data = await response.json();
                setRepos(data);
            } catch (error) {
                console.error('Error fetching pinned repos:', error);
            }
        }

        fetchPinnedRepos();
    }, [username]);

    return (
        <div>
            <Carousel fullHeightHover={false} animation='slide' interval='5000' duration='700'>
                {repos.map((repo) => (
                    <Grid container sx={{
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