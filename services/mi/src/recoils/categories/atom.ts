import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const categories = atom({
  key: 'categories',
  default: [],
  effects: [persistAtom],
});

export default categories;
