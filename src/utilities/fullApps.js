
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SmartToyIcon from '@mui/icons-material/SmartToy';
// Definition for larger Apps (Routing to new pages)

export const FULL_APPS = [
    {
        id: 'treasure_island',
        title: 'Treasure Island',
        description: 'An interactive text-based adventure game where you make choices to find the treasure.',
        path: '/python/treasure-island',
        icon: <><AttachMoneyIcon fontSize="large" sx={{ color: 'white' }} /><AttachMoneyIcon fontSize="large" sx={{ color: 'white' }} /></>,
        color: '#43a047',

    }, {
        id: 'python_or_bot',
        title: 'Python or Bot',
        description: 'A fun game to test if you can outsmart the Python script or if it will outsmart you!',
        path: 'https://humanorbot.vercel.app/',
        icon: <><SmartToyIcon fontSize="large" sx={{ color: 'white' }} /><SmartToyIcon fontSize="large" sx={{ color: 'white' }} /></>,
        color: '#0cf451',

    },
    {
        id: 'hangman',
        title: 'Hangman',
        description: 'Classic word guessing game to improve your vocabulary and have fun!',
        path: '/python/hangman',
        icon: <SportsEsportsIcon fontSize="large" sx={{ color: 'white' }} />,
        color: '#ff7043',
    },
];