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
  