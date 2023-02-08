import { selectorFamily, selector } from 'recoil';
import categories from './atom';

const makeResult = ({ data, useSort = true }: { data: any; useSort?: boolean }) => {
  const arr = useSort ? data.sort() : data;
  return arr.map((key) => ({
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
    return makeResult({ data: result });
  },
});

// 제품군
export const familySector = selectorFamily({
  key: 'family-selector',
  get:
    ({ category, notOption }: { category: string; notOption?: boolean }) =>
    ({ get }) => {
      const categoryList = get(categories);
      if (!category || !Object.keys(categoryList)?.length) {
        return [];
      }
      const result = Object.keys(categoryList[category]);
      return notOption ? result : makeResult({ data: result, useSort: false });
    },
});

// 기능군
export const functionalGroupSelector = selectorFamily({
  key: 'functional-group-selector',
  get:
    ({ category, family }: { category: string; family: string[] }) =>
    ({ get }) => {
      const categoryList = get(categories);
      if (!Object.keys(categoryList)?.length || !category || !family) {
        return [];
      }
      const familyObj = categoryList[category];

      const result = family.reduce((pre: string[], cur) => {
        if (familyObj[cur]) {
          const { functionalGroup } = familyObj[cur];

          const newFunctionalGroup = new Set<string>([...pre, ...functionalGroup]);

          return [...newFunctionalGroup];
        } else return pre;
      }, []);
      return makeResult({ data: result });
    },
});

// 제품
export const productSelector = selectorFamily({
  key: 'product-selector',
  get:
    ({
      category,
      family,
      functionalGroup: functionalGroupFilter,
    }: {
      category: string;
      family: string[];
      functionalGroup?: string[];
    }) =>
    ({ get }) => {
      const categoryList = get(categories);
      if (!Object.keys(categoryList)?.length || !category || !family) {
        return [];
      }
      const familyObj = categoryList[category];

      const result = family.reduce((pre: string[], cur) => {
        if (familyObj[cur]) {
          const { product } = familyObj[cur];
          const productArr = functionalGroupFilter
            ? functionalGroupFilter?.reduce((pre, cur) => {
                if (product[cur]) {
                  pre.push(product[cur]);
                }
                return pre;
              }, [] as string[])
            : product.all;
          const newProduct = new Set<string>([...pre, ...productArr]);

          return [...newProduct];
        } else return pre;
      }, []);
      return makeResult({ data: result });
    },
});
