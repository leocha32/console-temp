import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { theme, muiTheme } from '../src/constants/theme';
import './style.css';
import { useEffect } from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// const UseGoogle = () => {
{
  /*  useEffect(() => {*/
}
{
  /*    // const handleClientLoad = () => window.gapi.load('client:auth2', initClient);*/
}

{
  /*    // const initClient = (res) => {*/
}
{
  /*    //   window.gapi.auth2*/
}
//     //     .init({
//     //       clientId:
{
  /*    //         '583556409780-g87rmfphh1020ivct1cd9sthm6egnres.apps.googleusercontent.com',*/
}
//     //     })
{
  /*    //     .then((res) => console.log(res));*/
}
{
  /*    //   window.gapi.client.setApiKey('AIzaSyBWc5vhxKj8Vfq46IVDSR9OK6Yagq6smb0');*/
}
{
  /*    //   window.gapi.client*/
}
{
  /*    //     .load('https://sheets.googleapis.com/$discovery/rest?version=v4')*/
}
{
  /*    //     .then(*/
}
{
  /*    //       function (res) {*/
}
{
  /*    //         console.log(res);*/
}
{
  /*    //         console.log('GAPI client loaded for API');*/
}
{
  /*    //       },*/
}
{
  /*    //       function (err) {*/
}
//     //         console.error('Error loading GAPI client for API', err);
//     //       },
//     //     );
//     //   console.log(res, 'Google loaded');
//     // };
//
//     const script = document.createElement('script');
//
//     script.src = 'https://apis.google.com/js/api.js';
//     script.async = true;
//     script.defer = true;
//     script.onload = handleClientLoad;
//
//     document.body.appendChild(script);
//
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
// };

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <ThemeProviderMui theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </ThemeProviderMui>
    </MemoryRouter>
  ),
];
