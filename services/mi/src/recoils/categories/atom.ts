import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ICategories } from '$modules/management/categories';

const { persistAtom } = recoilPersist();
const categories = atom<ICategories>({
  key: 'categories',
  default: {},
  effects: [persistAtom],
});

export default categories;
