import { MonoColor, PrimaryColor, SecondaryColor } from './color';
import { ITheme } from 'mi-ui';
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ITheme {}
}

export const theme: ITheme = {
  color: {
    mono: MonoColor,
    primary: PrimaryColor,
    secondary: SecondaryColor,
  },
};
