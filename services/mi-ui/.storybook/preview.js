import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as ThemeProviderMui, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../src/constants/theme';
import './style.css';
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
    <MemoryRouter>
      <ThemeProviderMui theme={createTheme()}>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </ThemeProviderMui>
    </MemoryRouter>
  ),
];
