import { BlueColor, GrayColor, MonoColor, PrimaryColor, SecondaryColor } from './color';
import { ITheme } from 'mi-ui';

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
