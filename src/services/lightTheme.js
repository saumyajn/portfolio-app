const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ba8cd4', // lavender
    },
    secondary: {
      main: '#de87a7', // pink accent
    },
    info: {
      main: '#A2D2FF', // soft blue (for buttons, highlights)
    },
    success: {
      main: '#BDE0FE', // background section blue
    },
    background: {
      default: '#f8f3fc',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2b2b2b',
      secondary: '#404652',
    }
  },
  typography: {
    // "Inter" is better for reading long text than Quicksand
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    // Use Quicksand only for Headings to keep the personality
    h1: { fontFamily: '"Quicksand", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Quicksand", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },

    // Buttons look more professional in Inter
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none' // Removes the all-caps default which looks dated
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FDF7FF',
          color: '#1a1a1a',
        },
      },
    },
  },
};
export default lightTheme;
