export interface ITheme {
  color: {
    primary: {
      [key: string]: string;
    };
    secondary: {
      [key: string]: string;
    };
    mono: {
      [key: string]: string;
    };
  };
  palettes: {
    blue: {
      [key: string]: string;
    };
    gray: {
      [key: string]: string;
    };
  };
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ITheme {}
}

export default ITheme;
