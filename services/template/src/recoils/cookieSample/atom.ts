import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { cookieStorage } from 'utils/cookie-storage';

const { persistAtom } = recoilPersist({
  key: 'cookie-sample-persist',
  storage: cookieStorage,
});

const sample = atom({
  key: 'cookie-sample',
  default: '',
  effects: [persistAtom],
});

export default sample;
