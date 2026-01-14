import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';

// ⭐ FEATURED PROJECTS: Manually add your best work here
const FEATURED_PROJECTS = [
    {
        id: 1,
        name: "Portfolio App",
        description: "A highly performant, personal portfolio website built with React, Material UI, and Firebase. Features dynamic theming, lazy loading, and glassmorphism UI.",
        tags: ["React", "MUI", "Firebase"],
        repo: "https://github.com/saumyajn/portfolio-app",
        demo: "https://saumya-jain-portfolio.vercel.app/"
    },
     {
        id: 2,
        name: "Arcade Stack",
        description: "Modular game portal featuring multiple mini-games with score tracking and theming.",
        tags: ["React", "MUI", "Firebase"],
        repo: "https://github.com/saumyajn/arcade-stack",
        demo: "https://arcade-stack.vercel.app/"
    },
    // Add another big project here manually
];

const SKILL_CATEGORIES = [
    { title: "Frontend & Design", icon: <CodeIcon color="secondary"/>, skills: ['React', 'Next.js', 'MUI', 'Tailwind', 'Figma'] },
    { title: "Backend & Cloud", icon: <StorageIcon color="info"/>, skills: ['Python', 'Firebase', 'Node.js', 'MongoDB'] },
];

export default function Projects() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [githubRepos, setGithubRepos] = useState([]);

    // Fetch YOUR real repos, not starred ones
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Fetch repos sorted by update time, specifically YOURS
                const res = await fetch('https://api.github.com/users/saumyajn/starred?sort=updated&type=owner');
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Filter out forks if you want only your code: .filter(repo => !repo.fork)
                    setGithubRepos(data); 
                }
            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };
        fetchRepos();
    }, []);

    const ProjectCard = ({ project, isFeatured = false }) => (
        <Card 
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                background: isDarkMode ? 'rgba(30, 30, 40, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)', border: `1px solid ${theme.palette.primary.main}` ,boxShadow: '0 5px 20px rgb(255 25 221 / 20%)' }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {isFeatured && <Chip label="Featured" color="primary" size="small" sx={{ mb: 1 }} />}
                <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily="Quicksand">
                    {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: 'Inter' }}>
                    {project.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(project.tags || project.topics?.slice(0,3))?.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    ))}
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button startIcon={<GitHubIcon />} size="small" href={project.repo || project.html_url} target="_blank">Code</Button>
                {(project.demo || project.homepage) && (
                    <Button startIcon={<LaunchIcon />} size="small" href={project.demo || project.homepage} target="_blank">Live Demo</Button>
                )}
            </CardActions>
        </Card>
    );

    return (
        <Box id="projects" sx={{ minHeight: '100vh', py: 10, px: { xs: 2, md: 8 } }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                
                {/* 1. SECTION HEADER */}
                <Typography variant="h2" sx={{ mb: 1, fontFamily: 'Quicksand', fontWeight: 700 }}>
                    My Work
                </Typography>
                <Typography variant="h7" color="text.secondary" sx={{ mb: 8, fontFamily: 'Inter', maxWidth: '600px', alignmentBaseline: 'middle' }}>
                    A selection of my favorite projects, ranging from web applications to creative coding experiments.
                </Typography>

                {/* 2. FEATURED PROJECTS (Manually Curated) */}
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Featured Projects</Typography>
                <Grid container spacing={3} sx={{ mb: 8 }}>
                    {FEATURED_PROJECTS.map((project) => (
                        <Grid item xs={12} md={6} key={project.id}>
                            <ProjectCard project={project} isFeatured={true} />
                        </Grid>
                    ))}
                </Grid>

                {/* 3. OTHER REPOS (Dynamic from GitHub) */}
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Latest from GitHub</Typography>
                <Grid container spacing={3} sx={{ mb: 8 }}>
                    {githubRepos.map((repo) => (
                        <Grid item xs={12} sm={6} md={4} key={repo.id}>
                            <ProjectCard project={repo} />
                        </Grid>
                    ))}
                </Grid>

                {/* 4. SKILLS SECTION (Cleaned up) */}
                <Card sx={{ p: 4, borderRadius: 4, background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }} elevation={0}>
                    <Grid container spacing={4}>
                        {SKILL_CATEGORIES.map((cat) => (
                            <Grid item xs={12} md={6} key={cat.title}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                                    {cat.icon}
                                    <Typography variant="h6" fontWeight="bold">{cat.title}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {cat.skills.map(skill => (
                                        <Chip key={skill} label={skill} />
                                    ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Box>
        </Box>
    );
}