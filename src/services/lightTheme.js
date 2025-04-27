const lightTheme = {
    palette: {
      mode: 'light',
      primary: {
        main: '#CDB4DB', // lavender
      },
      secondary: {
        main: '#FFAFCC', // pink accent
      },
      info: {
        main: '#A2D2FF', // soft blue (for buttons, highlights)
      },
      success: {
        main: '#BDE0FE', // background section blue
      },
      background: {
        default: '#FDF7FF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1a1a1a',
        secondary: '#6b7280',
      },
    },
    typography: {
      fontFamily: '"Quicksand", "Roboto", sans-serif',
      fontWeightBold: 700,
      h5: {
        fontWeight: 600,
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
  