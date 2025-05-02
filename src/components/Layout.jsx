import { keyframes } from '@mui/system';
import { lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Home from './Home';
import DustOverlay from './DustOverlay';
import { useTheme } from '@mui/material/styles';
import Footer from './Footer';

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const lightGradient = 'linear-gradient(270deg, #ecd9f7, #fcd2e1, #fdbccc, #cbe7fc, #b3dbfd)';

const darkGradient = 'linear-gradient(270deg, #372c50, #45244a, #301e3c, #1b1b30, #262646)';


const AboutMe = lazy(() => import('../components/AboutMe'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

export default function Layout() {

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%',
                height: 'auto',
                // overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                background: isDarkMode ? darkGradient : lightGradient,
                backgroundSize: '1000% 1000%',
                animation: `${gradient} 20s ease infinite`,
            }}
        >
            <DustOverlay />
            {/* ⬇️ Your page content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Header />
                <Suspense fallback={<div>Loading...</div>}>
                    <div id="home" style={{ scrollSnapAlign: 'start' }}><Home /></div>
                    <div id="about" style={{ scrollSnapAlign: 'start' }}><AboutMe /></div>
                    <div id="projects" style={{ scrollSnapAlign: 'start' }}><Projects /></div>
                    <div id="contact" style={{ scrollSnapAlign: 'start' }}><Contact /></div>
                </Suspense>
                <Footer/>
            </Box>
        </Box>
    );
}
