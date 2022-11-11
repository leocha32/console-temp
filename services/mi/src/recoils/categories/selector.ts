import { selectorFamily } from 'recoil';
import categories from './atom';

export const categoriesSelector = selectorFamily({
  key: 'categories',
  get:
    (type: string[]) =>
    ({ get }) => {
      const categoryList = get(categories);

      const result = type.reduce((pre, cur) => {
        return pre[cur];
      }, categoryList);

      return Array.isArray(result) ? result : Object.keys(result);
    },
});
