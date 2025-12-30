import { Box } from '@mui/material';
import Header from './Header';
import DustOverlay from './DustOverlay';
import Footer from './Footer';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // 👈 IMPORT THIS
import { keyframes } from '@mui/system';

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const lightGradient = 'linear-gradient(270deg, #ecd9f7, #fcd2e1, #fdbccc, #cbe7fc, #b3dbfd)';
const darkGradient = 'linear-gradient(270deg, #2d2240, #3a1c4d, #1a2238, #232946, #3e206d)';

export default function Layout() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        try {
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) setAnimate(false);
        } catch (e) {}
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                height: 'auto',
                scrollSnapType: 'y mandatory',
                background: isDarkMode ? darkGradient : lightGradient,
                backgroundSize: '400% 400%',
                animation: animate ? `${gradient} 60s ease infinite` : 'none',
                overflowX: 'hidden' // Prevents horizontal scrollbar issues
            }}
        >
            <DustOverlay />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Header />
                
                {/* ⬇️ THIS IS THE KEY CHANGE */}
                {/* The Outlet renders whatever the current URL points to */}
                <Box sx={{ minHeight: '80vh' }}>
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </Box>
    );
}