import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
  primary: '#f04040',
  secondary: '#1f1f1f',
  error: '#d8000c',
  bgcolor: '#f6f6f6',
});

// export const theme = createMuiTheme({
// 	bla: 1,
//   typography: {
//     fontFamily: '"Roboto"',
//     fontSize: 12,
//     h1:{
//        // could customize the h1 variant as well
//     }
//   },
//   palette: {
//     primary: { main: "#fff12323" },
//     secondary: { main: green[300] }
//   },
// });

export default theme;
