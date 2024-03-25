import * as React from 'react';
// import Button from '@mui/material/Button';
import { AppBar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Face3TwoToneIcon from '@mui/icons-material/Face3TwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import StarsTwoToneIcon from '@mui/icons-material/StarsTwoTone';
import ContactPageTwoToneIcon from '@mui/icons-material/ContactPageTwoTone';
import { pink } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import styles from '../styles/header.module.css'
import PathConstants from '../routes/pathConstants';
import { Link, useNavigate } from "react-router-dom";
const drawerWidth = 200;

const headersList = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about-me' }, { name: 'Projects', path: '/projects' }, { name: 'Contact', path: '/contact' }];

export default function Header() {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const navigate = useNavigate();
    const handleListItemClick = (event, text, index) => {
        event.preventDefault();
        setSelectedIndex(index);
        navigate(text)


    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' color='transparent' elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} enableColorOnDark >
                <Toolbar>
                    <Typography variant="h5" noWrap component="div">
                        Saumya Jain
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent"

                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, borderWidth: 0, background: 'transparent' }
                }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>

                    <List>
                        {headersList.map((text, index) => (

                            <ListItem key={text.name} className={styles.listSpacing} >

                                <ListItemButton selected={selectedIndex === index} className={selectedIndex === index ? styles.listSelected : styles.listNotSelected}
                                    onClick={(event) => handleListItemClick(event, text.path, index)}>

                                    <ListItemIcon className={styles.iconWidth}>{
                                        [<HomeTwoToneIcon color='primary' />, <Face3TwoToneIcon sx={{ color: pink[500] }} />, <StarsTwoToneIcon color='success' />, <ContactPageTwoToneIcon color='secondary' />][index]}</ListItemIcon>

                                    <ListItemText
                                        primary={text.name}
                                    ></ListItemText>
                                </ListItemButton>

                            </ListItem>

                        ))}

                    </List>


                </Box>
            </Drawer >
        </Box >
    )


}