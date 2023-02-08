import { initializeApp } from 'firebase/app';
import {
  SAMLAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getIdToken,
  onIdTokenChanged,
} from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBdAdlFLk9mlLFcbLBq3u3IcQijJkPJXKw',
  authDomain: 'nm-prod-global-cw-mi.firebaseapp.com',
};
initializeApp(config);

const tenantId = 'cw-mi-console-prod-ln918';
const providerId = 'saml.cw-mi-console-prod';
const auth = getAuth();

auth.tenantId = tenantId;
const provider = new SAMLAuthProvider(providerId);

export {
  provider,
  auth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getIdToken,
  onIdTokenChanged,
};
