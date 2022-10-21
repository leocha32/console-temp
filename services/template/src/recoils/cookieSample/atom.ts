import { atom, AtomEffect, AtomOptions } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { cookieStorage } from 'utils/cookie-storage';

const { persistAtom } = recoilPersist({
  key: 'cookie-sample',
  storage: cookieStorage,
});

const sample = atom({
  key: 'cookie-sample',
  default: '',
  effects: [persistAtom],
});

export default sample;
