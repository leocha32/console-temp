import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as ThemeProviderMui, createTheme } from '@mui/material/styles';

import { theme } from '../src/constants/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProviderMui theme={createTheme()}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </ThemeProviderMui>
  ),
];
