import { Button, Chip, Card, CardContent, CardActions, Grid, Typography, Box } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { GitHub } from "@mui/icons-material";

const HoverRepoCard = React.memo(function HoverRepoCard({ repo, username }) {
    return (
        <Card
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-4px)",
                },
            }}
        >
            {/* Add your static image here if needed */}
            <CardContent sx={{ pt: 2, pb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, pt: 0 }}>
                    {repo.name}
                </Typography>
                {repo.topics?.length > 0 && (
                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {repo.topics.slice(0, 4).map((topic, idx) => (
                            <Chip
                                key={topic}
                                label={topic}
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(198, 174, 174, 0.04)",
                                    fontWeight: 500,
                                    px: 1,
                                    fontSize: "0.7rem",
                                 
                                    border: "1px solid rgba(198, 174, 174, 0.2)",
                                    "&:hover": {   boxShadow: 0.5, backgroundColor: "rgba(175, 122, 179, 0.2)"}
                                }}
                            />
                        ))}
                    </Box>
                )}
                {repo.description && (
                    <Typography variant="caption" sx={{ mt: 1 }}>
                        {repo.description}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 1 }}>
                <Button
                    size="small"
                    sx={{
                        px: 2, "&:hover": {
                            boxShadow: 1
                        },
                    }}
                    href={`https://github.com/${username}/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHub fontSize="small" />}
                >
                    Code
                </Button>
                {repo.homepage && (
                    <Button
                        size="small"
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontWeight: 500, px: 2, "&:hover": {
                            boxShadow: 1
                        }, }}
                    >
                        Demo
                    </Button>
                )}
            </CardActions>
        </Card>
    );
});

export function PinnedRepos({ username }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const cacheKey = `pinned:${username}`;
        const ttlMs = 1000 * 60 * 60; // 1 hour

        const fetchPinnedRepos = async () => {
            try {
                // Check cache first
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Date.now() - parsed.ts < ttlMs) {
                        if (isMounted) setRepos(parsed.data);
                        return;
                    }
                }

                // Limit per_page to 12 to reduce payload
                const res = await fetch(`https://api.github.com/users/${username}/starred?sort=updated&per_page=12`);
                const data = await res.json();
                const final = Array.isArray(data) ? data : [];
                if (isMounted) setRepos(final);
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: final }));
                } catch (e) {
                    // ignore storage exceptions
                }
            } catch (err) {
                if (isMounted) setRepos([]);
                console.error("Failed to fetch pinned repos", err);
            }
        };
        fetchPinnedRepos();
        return () => { isMounted = false; };
    }, [username]);

    // Memoize repo list rendering
    const repoCards = useMemo(() =>
        repos.map((repo) => (
            <Grid item key={repo.id || repo.name} xs={12} sm={6} md={4} lg={3}>
                <HoverRepoCard repo={repo} username={username} />
            </Grid>
        )),
        [repos, username]
    );

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {repoCards}
            </Grid>
        </Box>
    );
}