import { selectorFamily, selector } from 'recoil';
import categories from './atom';

const makeResult = (data) => {
  return data.sort().map((key) => ({
    label: key,
    value: key,
  }));
};
// 카테고리
export const categorySector = selector({
  key: 'category-selector',
  get: ({ get }) => {
    const categoryList = get(categories);
    const result = Object.keys(categoryList) || [];
    return makeResult(result);
  },
});

// 제품군
export const familySector = selectorFamily({
  key: 'family-selector',
  get:
    ({ category }: { category: string }) =>
    ({ get }) => {
      const categoryList = get(categories);
      if (!category || !Object.keys(categoryList)?.length) {
        return [];
      }
      const result = Object.keys(categoryList[category]);
      return makeResult(result);
    },
});

// 제품 & 기능군
export const productAndFunctionalGroupSelector = selectorFamily({
  key: 'product-functional-group-selector',
  get:
    ({ category, family }: { category: string; family: string[] }) =>
    ({ get }) => {
      const categoryList = get(categories);
      if (!Object.keys(categoryList)?.length || !category || !family) {
        return { functionalGroup: [], product: [] };
      }
      const familyObj = categoryList[category];

      const result = family.reduce(
        (pre: { functionalGroup: string[]; product: string[] }, cur) => {
          if (familyObj[cur]) {
            const { functionalGroup, product } = familyObj[cur];
            const newProduct = new Set<string>([...pre.product, ...product]);
            const newFunctionalGroup = new Set<string>([
              ...pre.functionalGroup,
              ...functionalGroup,
            ]);

            return {
              functionalGroup: [...newFunctionalGroup],
              product: [...newProduct],
            };
          } else return pre;
        },
        { functionalGroup: [], product: [] },
      );
      return {
        functionalGroup: makeResult(result.functionalGroup),
        product: makeResult(result.product),
      };
    },
});
