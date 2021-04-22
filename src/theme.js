import { createMuiTheme } from '@material-ui/core/styles';
import { teal, lightGreen } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: lightGreen[500]
    },
    secondary: {
      main: teal[500]
    },
    background: {
      default: '#202124',
    },
  },
});

export default theme;
