import React from 'react';
import { Box, Typography, Link, Stack, IconButton, Divider, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        px: 2,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 20, 35, 0.4)' : 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center' }}>
        
        {/* Top Section: Navigation or Logo could go here, but let's keep it simple */}
        <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={3}
            sx={{ mb: 4 }}
        >
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6" fontWeight="bold" fontFamily="Quicksand">
                    Saumya Jain
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Building digital experiences that matter.
                </Typography>
            </Box>

            {/* Social Icons */}
            <Stack direction="row" spacing={1}>
                <IconButton 
                    component={Link} 
                    href="https://github.com/saumyajn" 
                    target="_blank" 
                    color="inherit"
                    sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-3px)', color: theme.palette.primary.main } }}
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton 
                    component={Link} 
                    href="https://www.linkedin.com/in/saumya-jain06/" 
                    target="_blank" 
                    color="inherit"
                    sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-3px)', color: '#0077b5' } }}
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton 
                    component={Link} 
                    href="mailto:saumyajn@gmail.com" 
                    color="inherit"
                    sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-3px)', color: '#ea4335' } }}
                >
                    <EmailIcon />
                </IconButton>
            </Stack>
        </Stack>

        <Divider sx={{ mb: 4, opacity: 0.5 }} />

        {/* Bottom Section */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
             <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Saumya Jain. All rights reserved.
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Made with <FavoriteIcon sx={{ fontSize: 14, color: '#ff4081' }} /> using React & MUI
            </Typography>
        </Stack>

      </Box>
    </Box>
  );
}