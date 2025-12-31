import React from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

// Define a subtle "breathing" animation for the logo
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function Loader({ message = "Loading..." }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed', // Covers the whole screen
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Glassmorphism background matching your theme
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(20, 20, 35, 0.9)' 
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999, // Stays on top of everything
      }}
    >
      {/* 1. Pulsing Logo */}
      <Box
        component="img"
        src="/logo192.png" // Ensure this path matches your public folder logo
        alt="Loading Logo"
        sx={{
          width: 80,
          height: 80,
          mb: 4,
          animation: `${pulse} 2s infinite ease-in-out`,
          filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none'
        }}
      />

      {/* 2. Professional Typography */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Quicksand',
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 2,
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontSize: '0.9rem'
        }}
      >
        {message}
      </Typography>

      {/* 3. Thin, Modern Progress Bar */}
      <Box sx={{ width: '200px' }}>
        <LinearProgress 
          color="primary" 
          sx={{ 
            height: 4, 
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }} 
        />
      </Box>
    </Box>
  );
}