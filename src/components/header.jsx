import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon  from '@mui/icons-material/HomeRounded';

import Face3RoundedIcon from '@mui/icons-material/Face3Rounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import ThemeToggle from './ThemeToggle';
const navItems = [
  { name: 'Home', id: 'home', icon: <HomeRoundedIcon color="inherit"  /> },
  { name: 'About', id: 'about', icon: <Face3RoundedIcon color="inherit"  /> },
  { name: 'Projects', id: 'projects', icon: <StarsRoundedIcon color="inherit"  /> },
  { name: 'Contact', id: 'contact', icon: <ContactPageRoundedIcon color="inherit" /> },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -60; // Approximate header height (you can adjust this)
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box  sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => {scrollTo(item.id);handleDrawerToggle();}}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> <Box sx={{ borderTop: '1px solid #ddd', mt: 'auto', py: 1 }}>
        <ThemeToggle/>
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={1}sx={{
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      borderRadius:3,
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6" sx={{ ml: 2, fontSize: { xs: '1.15rem', sm: '1.25rem' } }}>
      <Box component="img" src="/logo.png" alt="Saumya Logo" sx={{ height: 70 }} />

        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              startIcon={item.icon}
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor:  theme => theme.palette.mode === 'light'
                  ? 'rgba(205, 180, 219, 0.2)'  // light: soft purple tint
                  : 'rgba(255, 175, 204, 0.1)',
                  color: 'secondary.main', // slight highlight
                  borderRadius: 2,
                },
              }}
              
            >
              {item.name}
            </Button>
          ))}
          <ThemeToggle/>
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
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
            width: 240,
            backgroundColor: '#faf5ff',
            color: '#1a1a1a',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}