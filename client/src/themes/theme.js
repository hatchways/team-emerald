import { createMuiTheme } from '@material-ui/core';

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
    MuiTextField: {
      inputProps: {
        style: {
          textAlign: 'center',
          fontSize: '15px',
        },
      },
    },
  },
  // overrides: {
  //   MuiInput: {
  //     input: {
  //       '&::placeholder': {
  //         textAlign: 'center',
  //       },
  //     },
  //   },
  // },
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
