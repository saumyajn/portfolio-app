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
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"Quicksand", sans-serif', fontWeight: 700 },
      h2: { fontFamily: '"Quicksand", sans-serif', fontWeight: 700 },
      h3: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
      h4: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
      h5: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
      button: { 
        fontFamily: '"Inter", sans-serif', 
        fontWeight: 600, 
        textTransform: 'none' 
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
  