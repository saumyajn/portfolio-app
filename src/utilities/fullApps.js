
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SmartToyIcon from '@mui/icons-material/SmartToy';
// Definition for larger Apps (Routing to new pages)

export const FULL_APPS = [
    {
        id:'treasure_island',
        title: 'Treasure Island',
        description: 'An interactive text-based adventure game where you make choices to find the treasure.',
        path: '/python/treasure-island',
        icon: <><AttachMoneyIcon fontSize="large" sx={{ color: 'white' }} /><AttachMoneyIcon fontSize="large" sx={{ color: 'white' }} /></>,
        color: '#43a047',   

    },
     {
        id:'rock_paper_scissors',
        title: 'Rock Paper Scissors',
        description: 'An interactive game where you play against the computer.',
        path: '/python/rock-paper-scissors',
        icon: <><SmartToyIcon fontSize="large" sx={{ color: 'white' }} /><SmartToyIcon fontSize="large" sx={{ color: 'white' }} /></>,
        color: '#288bd7',   

    },
    {
        id: 'hangman',
        title: 'Hangman',
        description: 'Coming SOON! Classic word guessing game.',
        // path: '/python/hangman',
        icon: <SportsEsportsIcon fontSize="large" sx={{ color: 'white' }} />,
        color: '#ff7043',
    },
];