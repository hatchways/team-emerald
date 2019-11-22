import { createMuiTheme } from '@material-ui/core';

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
  boxShadowTheme: '0px 0px 30px rgba(208,219,233,0.3)', // project theme
  palette: {
    primary: { main: '#DF1B1B' },
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application
    },
    MuiInput: {
      disableUnderline: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
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
