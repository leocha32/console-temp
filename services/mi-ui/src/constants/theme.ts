import { MonoColor, PrimaryColor, SecondaryColor, BlueColor, GrayColor } from './color';

import { ITheme } from 'types';

export const theme: ITheme = {
  color: {
    mono: MonoColor,
    primary: PrimaryColor,
    secondary: SecondaryColor,
  },
  palettes: {
    gray: GrayColor,
    blue: BlueColor,
  },
};
