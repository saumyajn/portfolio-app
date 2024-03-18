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
const drawerWidth = 200;

const headersList = ['Home', 'About Me', 'Passion Projects', 'Contact Me'];

export default function Header() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);

    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' color='transparent' elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} enableColorOnDark >
                <Toolbar>
                    <Typography variant="h4" noWrap component="div">
                        Saumya Jain
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, borderWidth: 0 }
                }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {headersList.map((text, index) => (
                            <ListItem key={text} className={styles.listSpacing}>
                                <ListItemButton selected={selectedIndex === index} className={styles.listSelected}
                                    onClick={(event) => handleListItemClick(event, index)}>
                                    <ListItemIcon className={styles.iconWidth}>{[<HomeTwoToneIcon color='success' />, <Face3TwoToneIcon sx={{ color: pink[500] }} />, <StarsTwoToneIcon color='primary' />, <ContactPageTwoToneIcon color='secondary' />][index]}</ListItemIcon>

                                    <ListItemText
                                        primary={text}
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