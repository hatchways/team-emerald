import { createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Open Sans"'].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    htmlFontSize: 10,
    fontSize: 10,
  },
  palette: {
    primary: { main: '#DF1B1B' },
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application
    },
  },
});

export default theme;
