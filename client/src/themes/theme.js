import { createMuiTheme } from '@material-ui/core';

// For custom properties not found in the default MuiTheme object
const themeSettings = {
  boxShadow: '0px 0px 30px rgba(208,219,233,0.3)',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Open Sans"'].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    htmlFontSize: 10,
    body1: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
    },
  },
  boxShadowTheme: themeSettings.boxShadow,
  backgroundColor: '#FBFCFF',
  palette: {
    primary: { main: '#DF1B1B' },
    secondary: { main: '#00D600' },
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
      },
    },
    MuiCard: {
      root: {
        borderRadius: 10,
        boxShadow: '0px 0px 20px rgba(208,219,233,0.2)',
        width: '25rem',
        height: '35rem',
        margin: 8,
      },
    },
    MuiInputBase: {
      input: {
        textAlign: 'center',
        borderRadius: 5,
        boxShadow: themeSettings.boxShadow,
        height: '7rem',
        fontSize: '1.4rem',
        fontWeight: 400,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 5,
      },
    },
  },
});

export default theme;
