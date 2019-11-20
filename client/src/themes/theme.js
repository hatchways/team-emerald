import { createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica Neue, Arial',
    color: 'green'
  },
  palette: {
    primary: red,
  },
});

export default theme;
