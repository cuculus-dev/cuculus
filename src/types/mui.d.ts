export {};

declare module '@mui/system/createTheme/createBreakpoints' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    favorite: true;
    repost: true;
    more: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface Palette {
    favorite: {
      main: string;
    };
    repost: {
      main: string;
    };
    more: {
      main: string;
    };
  }

  interface PaletteOptions {
    favorite: {
      main: string;
    };
    repost: {
      main: string;
    };
    more: {
      main: string;
    };
  }
}
