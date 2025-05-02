import { Button, Chip, Card, CardContent, CardActions, Grid, Link, Typography, Box, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { GitHub } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
export function PinnedRepos({ username }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {

        const fetchPinnedRepos = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/starred?sort=updated`);
                const data = await res.json();
                setRepos(data);
                console.log(repos)
            } catch (err) {
                console.error("Failed to fetch pinned repos", err);
            }
        };

        fetchPinnedRepos();
    }, [username]);

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {repos.map((repo, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <HoverRepoCard repo={repo} username={username} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    function HoverRepoCard({ repo, username }) {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
        const [hovered, setHovered] = useState(false);
        const overlayBg = theme.palette.mode === "dark" ? "rgba(37, 37, 37, 0.9)" : "rgba(250, 235, 235, 0.95)";

        return (
            <Card onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => isMobile && setHovered(!hovered)}
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.paper",
                    transition: "transform 0.3s ease-in-out",
                    cursor: isMobile ? "pointer" : "default",
                    '&:hover': {
                        transform: isMobile ? 'none' : 'scale(1.02)',
                    },
                }}
            >
                {(hovered || isMobile) && repo.homepage && (
                    <Box sx={{ width: '100%', height: '100px', overflow: 'hidden' }}>
                        <img
                            src={`https://image.thum.io/get/${repo.homepage}`}
                            alt={`${repo.homepage}`}
                            style={{
                                width: '100%',
                                objectFit: 'scale-down',
                                borderRadius: '8px',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                            }}
                        />
                    </Box>
                )}
                <CardContent sx={{ pt: 2, pb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, pt: 0 }}>
                        {repo.name}
                    </Typography>
                    {repo.topics?.length > 0 && (
                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {repo.topics.slice(0, 4).map((topic, idx) => (
                                <Chip
                                    key={idx}
                                    label={topic}
                                    size="small"
                                    sx={{
                                        backgroundColor: "rgba(0,0,0,0.04)",
                                        fontWeight: 500,
                                        px: 1,
                                        fontSize: "0.7rem",
                                    }}
                                />
                            ))}
                        </Box>
                    )}


                    {(hovered || isMobile) && (
                        <Typography variant="caption" sx={{ mt: 1 }}>
                            {repo.description}
                        </Typography>
                    )}

                </CardContent>
                {(hovered || isMobile) && (
                    <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 1 }}>
                        <Button
                            size="small"
                            href={`https://github.com/${username}/${repo.repo}`}
                            target="_blank"
                            startIcon={<GitHub fontSize="small" />}
                        >
                            Code
                        </Button>
                        {repo.homepage && (
                            <Button
                                size="small"
                                href={repo.homepage}
                                target="_blank"
                                sx={{ fontWeight: 500 }}
                            >
                                Demo
                            </Button>
                        )}
                    </CardActions>
                )}
            </Card>
        );
    }

}