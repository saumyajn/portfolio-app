import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading({ size = 40, text = 'Loading…', inline = false }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (inline) {
    // compact inline loader suitable for placing inside sections
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {!reduced && <CircularProgress size={size} thickness={4} />}
        <Typography variant="body2" color="text.secondary">{text}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6 }}>
      {!reduced && <CircularProgress size={size} />}
      <Typography sx={{ mt: 2 }} color="text.secondary">{text}</Typography>
    </Box>
  );
}
