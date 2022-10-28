import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'menu-status',
  storage: sessionStorage,
});

const menu = atom<{ open: boolean; expands: string[] }>({
  key: 'menu-status',
  default: {
    open: true,
    expands: [],
  },
  effects: [persistAtom],
});

export default menu;
