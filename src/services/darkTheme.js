const darkTheme = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#A786B4', // dark lavender
      },
      secondary: {
        main: '#FF88A4', // muted pink
      },
      info: {
        main: '#72B8E3', // darker version of #A2D2FF
      },
      success: {
        main: '#78ACD7', // muted version of #BDE0FE
      },
      background: {
        default: '#241e36', // base dark
        paper: '#2A233C',
      },
      text: {
        primary: '#f4f4f5',
        secondary: '#cbd5e1',
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
            backgroundColor: '#2B2540',
            color: '#f4f4f5',
          },
        },
      },
    },
  };
  export default darkTheme;
  