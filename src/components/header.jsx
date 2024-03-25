import * as React from 'react';
// import Button from '@mui/material/Button';
import { AppBar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Face3TwoToneIcon from '@mui/icons-material/Face3TwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import StarsTwoToneIcon from '@mui/icons-material/StarsTwoTone';
import ContactPageTwoToneIcon from '@mui/icons-material/ContactPageTwoTone';
import { pink, red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import styles from '../styles/header.module.css'
import PathConstants from '../routes/pathConstants';
import { Link, useNavigate } from "react-router-dom";
const drawerWidth = 200;

const headersList = [{ name: 'Home', path: '/' }, { name: 'About Me', path: '/about-me' }, { name: 'Passion Projects', path: '/projects' }, { name: 'Contact Me', path: '/contact' }];

export default function Header(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const navigate = useNavigate();
    const handleListItemClick = (event, text, index) => {
        event.preventDefault();
        setSelectedIndex(index);
        navigate(text)
        props.parentCallBack(text)
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
                                        [<HomeTwoToneIcon sx={{ color: '#C00E8B ' }} />, <Face3TwoToneIcon  color="primary"/>, <StarsTwoToneIcon color='success' />, <ContactPageTwoToneIcon sx={{ color: '#8B0000' }} />][index]}</ListItemIcon>

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