import {
  BlueColor,
  GrayColor,
  MonoColor,
  PrimaryColor,
  SecondaryColor,
  BrandColor,
} from './color';
import { ITheme } from 'mi-ui';

export const theme: ITheme = {
  color: {
    mono: MonoColor,
    primary: PrimaryColor,
    secondary: SecondaryColor,
    brand: BrandColor,
  },
  palettes: {
    gray: GrayColor,
    blue: BlueColor,
  },
};
