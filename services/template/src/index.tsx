import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './constants/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
