import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Box, IconButton, Drawer, List, 
  ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Face3Rounded';
import WorkIcon from '@mui/icons-material/StarsRounded';
import MailIcon from '@mui/icons-material/ContactPageRounded';
import DescriptionIcon from '@mui/icons-material/Description'; 
import TerminalIcon from '@mui/icons-material/TerminalRounded'; // Updated Icon for Python

import ThemeToggle from './ThemeToggle';

// UPDATED: Renamed Utilities to Python. 
// You can add 'Hangman' here later by adding a new object to this array.
const NAV_ITEMS = [
  { name: 'Home', id: 'home', icon: <HomeIcon /> },
  { name: 'About', id: 'about', icon: <PersonIcon /> },
  { name: 'Github', id: 'projects', icon: <WorkIcon /> },
  { name: 'Contact', id: 'contact', icon: <MailIcon /> },
  { name: 'Code Playpen', id: 'python', path: '/python', icon: <TerminalIcon /> }, 
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavClick = (item) => {
    setMobileOpen(false); 

    // 1. Route Navigation (For Python, Hangman, etc.)
    if (item.path) {
        navigate(item.path);
        return;
    }

    // 2. Scroll Navigation (For Home sections)
    if (isHomePage) {
      scrollToSection(item.id);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(item.id), 100);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', pt: 2 }}>
      <Box 
        component="img" 
        src="/logo192.png" 
        alt="Logo" 
        sx={{ height: 50, mb: 2, filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none' }} 
      />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => handleNavClick(item)} sx={{ justifyContent: 'center' }}>
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component="a" href="/Saumya_Jain_resume.pdf" target="_blank" sx={{ justifyContent: 'center' }}>
             <ListItemIcon sx={{ minWidth: 40 }}><DescriptionIcon color="primary" /></ListItemIcon>
             <ListItemText primary="Resume" primaryTypographyProps={{ color: 'primary', fontWeight: 'bold' }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ mt: 'auto', py: 2 }}>
        <ThemeToggle />
      </Box>
    </Box>
  );

  return (
    <AppBar 
      component="nav"
      position="sticky"
      elevation={scrolled ? 4 : 0} 
      sx={{
        top: 0,
        backgroundColor: theme.palette.mode === 'dark' 
          ? (scrolled ? 'rgba(20, 20, 35, 0.8)' : 'transparent') 
          : (scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent'),
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
        transition: 'all 0.3s ease-in-out',
        width: '100%',
        maxWidth: '100vw',
        left: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
        <Box 
          onClick={() => handleNavClick({ id: 'home' })}
          sx={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1 
          }}
        >
          <Box component="img" src="/logo192.png" alt="Logo" sx={{ height: 50 }} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleNavClick(item)}
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '1rem',
                minWidth: 'auto',
                px: 2,
                '&:hover': { color: theme.palette.primary.main, background: 'transparent' }
              }}
            >
              {item.name}
            </Button>
          ))}

          <Button
            variant="contained"
            color="primary"
            href="/Saumya_Jain_resume.pdf"
            target="_blank"
            startIcon={<DescriptionIcon />}
            sx={{ 
              ml: 2, 
              borderRadius: '50px', 
              px: 3, 
              textTransform: 'none', 
              fontWeight: 600,
              boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
            }}
          >
            Resume
          </Button>

          <Box sx={{ ml: 1 }}>
            <ThemeToggle />
          </Box>
        </Box>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 260,
            backgroundColor: theme.palette.background.default, 
            backgroundImage: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}