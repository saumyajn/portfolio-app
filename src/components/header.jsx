import * as React from 'react';
import { AppBar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import Face3TwoToneIcon from '@mui/icons-material/Face3TwoTone';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import StarsTwoToneIcon from '@mui/icons-material/StarsTwoTone';
import ContactPageTwoToneIcon from '@mui/icons-material/ContactPageTwoTone';

import CssBaseline from '@mui/material/CssBaseline';

import styles from '../styles/header.module.css'
import { useNavigate } from "react-router-dom";
const drawerWidth = 200;

const headersList = [
    { name: 'Home', path: '/', icon: <HomeTwoToneIcon sx={{ color: '#D310C4' }} /> },
    { name: 'About Me', path: '/about-me', icon: <Face3TwoToneIcon sx={{ color: '#1344BC ' }} /> },
    { name: 'Passion Projects', path: '/projects', icon: <StarsTwoToneIcon sx={{ color: '#2b8830' }} /> },
    { name: 'Contact Me', path: '/contact', icon: <ContactPageTwoToneIcon sx={{ color: '#BA4D00' }} /> }];

export default function Header(props) {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const navigate = useNavigate();
    const handleListItemClick = (event, text, index) => {
        event.preventDefault();
        setSelectedIndex(index);
        navigate(text)
        localStorage.setItem('path', text)
        props.parentPathCall(text)
    };

    let GetValue = (val, index) => {
        React.useEffect(() => {
            let path = localStorage.getItem('path')
            if (val.path === path)
           setSelectedIndex(index)
        })

    }
    const list = (
        <List>
            {headersList.map((val, index) => (
                <ListItem key={val.name} className={styles.listSpacing} >
                    {GetValue(val, index)}
                    <ListItemButton
                        selected={selectedIndex === index}
                        className={selectedIndex === index ? styles.listSelected : styles.listNotSelected}
                        onClick={(event) => handleListItemClick(event, val.path, index)}>

                        <ListItemIcon className={styles.iconWidth}>
                            {val.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={val.name}
                        ></ListItemText>
                    </ListItemButton>

                </ListItem>

            ))}

        </List>)

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' color='transparent' elevation={0}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} enableColorOnDark >
                <Toolbar>

                    <IconButton aria-label='open drawer' sx={{ mr: 2, display: { sm: 'none' } }} onClick={handleDrawerToggle}>
                        <MenuTwoToneIcon />
                    </IconButton>
                    {/* <Switch name="dark" {...label} checked={checked} onChange={handleChange} /> */}
                    <Typography variant="h5" noWrap component="div" >
                        SJ
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="folders"
            >
                <Drawer
                    //   container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'rgb(240,240,240,0.9)' },
                    }}
                >
                    <Toolbar />
                    {list}
                </Drawer>
                <Drawer variant="permanent"

                    sx={{
                        display: { xs: 'none', sm: 'block' },

                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, borderWidth: 0, background: 'transparent' }
                    }}>
                    <Toolbar />

                    {list}

                </Drawer >
            </Box>
        </Box >
    )
}