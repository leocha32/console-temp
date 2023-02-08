import {
  MonoColor,
  PrimaryColor,
  SecondaryColor,
  BlueColor,
  GrayColor,
  BrandColor,
  YellowColor,
  GreenColor,
  VariantColor,
} from './color';

import { ITheme } from 'types';
import { createTheme } from '@mui/material/styles';

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
    yellow: YellowColor,
    green: GreenColor,
  },
  variant: VariantColor,
};

export const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
