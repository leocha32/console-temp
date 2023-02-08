import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMenuStatus } from 'mi-ui';

const { persistAtom } = recoilPersist({
  key: 'menu-status',
  storage: sessionStorage,
});

const menu = atom<IMenuStatus>({
  key: 'menu-status',
  default: {
    open: true,
    expands: ['/report'],
  },
  effects: [persistAtom],
});

export default menu;
