import { useState, useEffect } from 'react';
import googleApi from '$recoils/google';
import { useRecoilState } from 'recoil';
declare const gapi: any;

export const useGoogle = () => {
  const [gapiState, setGapiState] = useRecoilState(googleApi);
  // const [gapiState, setGapiState] = useState();
  useEffect(() => {
    console.log('Start Google Load!!');
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = setInit;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const setInit = () => {
    gapi.load('client:auth2', (res) => {
      gapi.client
        .init({
          apiKey: 'AIzaSyBWc5vhxKj8Vfq46IVDSR9OK6Yagq6smb0',
          clientId:
            '583556409780-9liktnp2snin64maga1l7lbsabgmt1ok.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/spreadsheets',
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        })
        .then((res) => {
          console.log(res, 'RES');
          setGapiState(gapi);
        });
    });
  };

  return {
    gapi: gapiState,
  };
};
