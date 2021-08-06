import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1F2D46",
      contrastText: "#fff",
    },
    secondary: {
      main: "#44B873",
      contrastText: "#fff",
    },
    
    error: {
      main: red.A400,
    },
    background: {
      default: "#F6F3F5",
      //default: "rgba(25,25,25,1)",
    },
    text: {
      primary: "#27204C",
      secondary: "grey",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    body1: {},
    body2: {},
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: "20px 10px",
        margin: "10px",
        backgroundColor: "#fff", // 5d737e
      },
    },
    MuiButton: {
      root: {
        margin: "5px",
      },
    },
  },
});
export default theme;
