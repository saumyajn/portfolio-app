import React from 'react';
import { keyframes } from '@mui/system';
import { Box } from '@mui/material';

const dustFloat = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  50% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
  100% { transform: translateY(0) translateX(0); opacity: 1; }
`;

const DustOverlay = () => {
  const dots = Array.from({ length: 20 }); // 30 small floating dots

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
      {dots.map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.38)', // Soft white dots
            animation: `${dustFloat} ${10 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </Box>
  );
};

export default DustOverlay;
