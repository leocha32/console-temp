import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './constants/theme';
import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as ThemeProviderMui, createTheme } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn:
    process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SENTRY_DSN : undefined,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [new BrowserTracing()],
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProviderMui theme={createTheme()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ThemeProviderMui>
  </BrowserRouter>,
);
