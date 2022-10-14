import { Theme } from '@emotion/react';
import { MonoColor, PrimaryColor, SecondaryColor } from './color';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Theme {
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
}

export const theme: Theme = {
  color: {
    mono: MonoColor,
    primary: PrimaryColor,
    secondary: SecondaryColor,
  },
};
