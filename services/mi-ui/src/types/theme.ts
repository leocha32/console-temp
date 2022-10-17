export interface ITheme {
  color: {
    mono: {
      [key: string]: string;
    };
    primary: {
      [key: string]: string;
    };
    secondary: {
      [key: string]: string;
    };
  };
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ITheme {}
}

export default ITheme;
