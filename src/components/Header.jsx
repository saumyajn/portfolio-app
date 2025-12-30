import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Box, IconButton, Drawer, List, 
  ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // 👈 Import Router hooks

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Face3Rounded';
import WorkIcon from '@mui/icons-material/StarsRounded';
import MailIcon from '@mui/icons-material/ContactPageRounded';
import DescriptionIcon from '@mui/icons-material/Description'; // For Resume

import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { name: 'Home', id: 'home', icon: <HomeIcon /> },
  { name: 'About', id: 'about', icon: <PersonIcon /> },
  { name: 'Projects', id: 'projects', icon: <WorkIcon /> },
  { name: 'Contact', id: 'contact', icon: <MailIcon /> },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Add scroll listener to change header style when scrolling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavClick = (id) => {
    setMobileOpen(false); // Close drawer on mobile

    if (isHomePage) {
      // If we are already home, just scroll
      scrollToSection(id);
    } else {
      // If we are on a "Future App" page, go home first, then scroll
      navigate('/');
      setTimeout(() => scrollToSection(id), 100);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
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
      {/* Mobile Logo */}
      <Box 
        component="img" 
        src="/logo192.png" 
        alt="Logo" 
        sx={{ height: 50, mb: 2, filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none' }} 
      />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => handleNavClick(item.id)} sx={{ justifyContent: 'center' }}>
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Mobile Resume Button */}
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
      elevation={scrolled ? 4 : 0} // Add shadow only when scrolled
      sx={{
        top: 0,
        backgroundColor: theme.palette.mode === 'dark' 
          ? (scrolled ? 'rgba(20, 20, 35, 0.8)' : 'transparent') 
          : (scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent'),
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
        transition: 'all 0.3s ease-in-out',
        width: '100%',
        maxWidth: '100vw', // Ensures it doesn't float weirdly
        left: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
        {/* LOGO */}
        <Box 
          onClick={() => handleNavClick('home')}
          sx={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1 
          }}
        >
          {/* If you prefer text logo over image, uncomment below */}
          {/* <Typography variant="h5" sx={{ fontFamily: 'Quicksand', fontWeight: 700 }}>Saumya.</Typography> */}
          <Box component="img" src="/logo192.png" alt="Logo" sx={{ height: 50 }} />
        </Box>

        {/* DESKTOP NAV */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
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

          {/* Special "Resume" CTA Button */}
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

        {/* MOBILE MENU ICON */}
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

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 260,
            backgroundColor: theme.palette.background.default, // Matches theme now
            backgroundImage: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}