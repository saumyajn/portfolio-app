import Box from '@mui/material/Box';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import LuggageTwoToneIcon from '@mui/icons-material/LuggageTwoTone';
import DinnerDiningTwoToneIcon from '@mui/icons-material/DinnerDiningTwoTone';
import Paper from '@mui/material/Paper';

export default function AboutMe() {

    const chipData = [
        {
            key: 0, label: 'Painting', icon: <ColorLensTwoToneIcon sx={{ color: '#2b8830' }} />
        },
        {
            key: 1, label: 'Music', icon: <LibraryMusicTwoToneIcon sx={{ color: '#D310C4' }} />
        },
        {
            key: 2, label: 'Travel', icon: <LuggageTwoToneIcon sx={{ color: '#1344BC ' }} />
        },
        {
            key: 3, label: 'Cooking', icon: <DinnerDiningTwoToneIcon sx={{ color: '#1344BC ' }} />
        }
    ];
    return (<div>
        <Box sx={{ height: '100vh', textAlign: 'center' }}>
            <h3>ABOUT ME</h3>
            <Paper sx={{ display: 'flex' }} style={{ backgroundColor: '#ffffff30', padding: '20px', margin: '10px' }}>
                <h4 sx={{ textAlign: 'justify' }}>
                    Full Stack developer (MEAN) with 4 years of experience in  conceptualizing, designing, and coding technical solutions using UI, Java and NodeJS technology stacks</h4>
            </Paper>
            <h3>My Interests</h3>
            <Paper sx={{ display: 'flex' }} style={{ backgroundColor: 'transparent', margin: '0 25%', padding: '5px', listStyle: 'none', width: 'fit-content', alignContent: 'center' }} component='ul'>

                {chipData.map((data) => {
                    return (
                        <li style={{ padding: '0 10px' }} key={data.key}>
                            <Chip icon={data.icon}
                                label={data.label} />
                        </li>
                    )
                })}
            </Paper>
        </Box>



    </div>)
}