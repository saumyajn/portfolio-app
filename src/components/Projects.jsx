import Box from '@mui/material/Box';
import * as React from 'react';
import CardActionsArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { PinnedRepos } from './getPinnedRepos';
import Chip from '@mui/material/Chip';

import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
const frontEndSkills = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Material UI'];
const backEndSkills = ['NodeJS', 'Express', 'MongoDB', 'REST APIs', 'Jenkins'];
const softSkills = ['Team Leadership', 'Communication', 'Problem Solving', 'Creative UI Design'];

export default function Projects() {
    const username = "saumyajn";
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box sx={{ minHeight: '100vh', mt: { xs: '60px', sm: 0 }, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom> PROJECTS</Typography>
            <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                            GitHub Projects
                        </Typography>
                        <PinnedRepos username={username} />
                    </Box>

                    <Box sx={{ mt: 8, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                            Area of Expertise
                        </Typography>

                        <Grid container spacing={6}>
                            {/* Frontend */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>Frontend & UI</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    {frontEndSkills.map((skill, index) => (
                                       <Chip
                                       label={skill}
                                       sx={{
                                         backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                         color: isDarkMode ? '#fff' : '#333',
                                         border: isDarkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
                                         fontWeight: 'bold',
                                       }}
                                     />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Backend */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>Backend & Tools</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    {backEndSkills.map((skill, index) => (
                                      <Chip
                                      label={skill}
                                      sx={{
                                        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                        color: isDarkMode ? '#fff' : '#333',
                                        border: isDarkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
                                        fontWeight: 'bold',
                                      }}
                                    />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Soft Skills */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>Professional Skills</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    {softSkills.map((skill, index) => (
                                         <Chip
                                         label={skill}
                                         sx={{
                                           backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                           color: isDarkMode ? '#fff' : '#333',
                                           border: isDarkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
                                           fontWeight: 'bold',
                                         }}
                                       />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
          
        </Box>
    );
}