import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    error: {
      main: red.A400,
    },
    background: {
      default: '#202124',
    },
  },
});

export default theme;
