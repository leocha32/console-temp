import {
  BlueColor,
  GrayColor,
  MonoColor,
  PrimaryColor,
  SecondaryColor,
  BrandColor,
  YellowColor,
  GreenColor,
  VariantColor,
} from './color';
import { ITheme } from 'mi-ui';
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

export const MuiTheme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR',sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      fontFamily: "'Noto Sans KR',sans-serif",
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
