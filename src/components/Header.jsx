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
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Face3RoundedIcon from '@mui/icons-material/Face3Rounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import ThemeToggle from './ThemeToggle';

const NAV_ICONS = {
  home: React.memo(() => <HomeRoundedIcon color="inherit" />),
  about: React.memo(() => <Face3RoundedIcon color="inherit" />),
  projects: React.memo(() => <StarsRoundedIcon color="inherit" />),
  contact: React.memo(() => <ContactPageRoundedIcon color="inherit" />),
};

const navItems = [
  { name: 'Home', id: 'home', icon: NAV_ICONS.home },
  { name: 'About', id: 'about', icon: NAV_ICONS.about },
  { name: 'Projects', id: 'projects', icon: NAV_ICONS.projects },
  { name: 'Contact', id: 'contact', icon: NAV_ICONS.contact },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollTo = (id) => {
    if (!id) return;
    // debounce to avoid multiple rapid scrolls
    if (scrollTo._timer) clearTimeout(scrollTo._timer);
    scrollTo._timer = setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        const yOffset = -60; // Approximate header height (you can adjust this)
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setMobileOpen(false);
      }
    }, 80);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => { scrollTo(item.id); handleDrawerToggle(); }}>
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> <Box sx={{ borderTop: '1px solid #ddd', mt: 'auto', py: 1 }}>
        <ThemeToggle />
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      zIndex: (theme) => theme.zIndex.drawer + 1,
      width: '95%', mx: 'auto'
    }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ ml: 2, fontSize: { xs: '1.15rem', sm: '1.25rem' } }}>
          <Box component="img" src="/logo192.png" alt="Saumya Logo" sx={{ height: 70 }} loading="lazy" decoding="async" />
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                startIcon={<Icon />}
                component="a"
                href={`#${item.id}`}
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  border: '2px solid transparent',
                  transition: 'border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: theme => theme.palette.mode === 'light'
                      ? 'rgba(205, 180, 219, 0.2)'
                      : 'rgba(255, 175, 204, 0.1)',
                    color: 'secondary.main',
                    borderRadius: 2,
                    boxShadow: '1px 2px 6px rgba(204, 163, 227, 0.3)'
                  },
                }}
              >
                {item.name}
              </Button>
            );
          })}
          <ThemeToggle />
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
