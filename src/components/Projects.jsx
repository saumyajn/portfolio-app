import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { PinnedRepos } from './PinnedRepos';

const frontEndSkills = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Material UI'];
const backEndSkills = ['NodeJS', 'Express', 'MongoDB', 'REST APIs', 'Jenkins'];
const softSkills = ['Team Leadership', 'Communication', 'Problem Solving', 'Creative UI Design'];

export default function Projects() {
    const username = "saumyajn";
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            id="projects"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'start',
                px: 2,
                py: 8,
            }}
        >
            <Card
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    p: { xs: 2, md: 4 },
                    width: '100%',
                    maxWidth: '1400px',
                }}
            >
                <CardContent>

                    <Typography
                        variant="h3"
                        sx={{
                            mb: 3,
                            fontFamily: 'Poppins, sans-serif',
                            color: 'text.primary',
                            textAlign: 'center',
                        }}
                    >
                        Projects
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
                        My recent work and open source contributions
                    </Typography>

                    {/* GitHub Projects Section */}
                    <Box sx={{ mb: 10 }}>
                        <PinnedRepos username={username} />
                    </Box>

                    {/* Area of Expertise Section */}
                    <Box>
                        <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
                            Area of Expertise
                        </Typography>

                        <Grid container spacing={6}>
                            {/* Frontend Skills */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    🖥️ Frontend & UI
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    {frontEndSkills.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            label={skill}
                                            sx={{
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                color: 'text',
                                                border: isDarkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Backend Skills */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    🔧 Backend & Tools
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    {backEndSkills.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            label={skill}
                                            sx={{
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                color: 'text',
                                                border: isDarkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Professional Skills */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    🎯 Professional Skills
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    {softSkills.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            label={skill}
                                            sx={{
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                color: 'text',
                                                border: isDarkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    );
}
