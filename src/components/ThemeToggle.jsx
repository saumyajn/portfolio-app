import { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ColorModeContext } from '../services/theme';


const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Tooltip title="Change Theme">
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
