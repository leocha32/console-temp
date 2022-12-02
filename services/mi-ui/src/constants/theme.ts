import { MonoColor, PrimaryColor, SecondaryColor, BlueColor, GrayColor } from './color';

import { ITheme } from 'types';
import { createTheme } from '@mui/material/styles';

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
