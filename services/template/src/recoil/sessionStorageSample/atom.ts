import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'session-storage-sample',
  storage: sessionStorage,
});

export const sample = atom({
  key: 'session-storage-sample',
  default: '',
  effects: [persistAtom],
});

export default sample;
