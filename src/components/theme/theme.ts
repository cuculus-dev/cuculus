import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      light: '#33d7da',
      main: '#00ced1',
      dark: '#009092',
    },
  },
});

export default theme;
