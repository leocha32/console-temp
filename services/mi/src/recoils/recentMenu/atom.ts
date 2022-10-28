import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const recentMenu = atom({
  key: 'recent-menu',
  default: [],
  effects: [persistAtom],
});

export default recentMenu;
