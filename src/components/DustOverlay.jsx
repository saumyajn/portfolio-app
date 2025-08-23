import React from 'react';
import { keyframes } from '@mui/system';
import { Box } from '@mui/material';

const dustFloat = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  50% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
  100% { transform: translateY(0) translateX(0); opacity: 1; }
`;

const DustOverlay = () => {
  const starCount = 120; // Increased number of stars
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: starCount }).map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.56)',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
            animation: `${dustFloat} ${10 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.8,
          }}
        />
      ))}
    </Box>
  );
};

export default DustOverlay;
