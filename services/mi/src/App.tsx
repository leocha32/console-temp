import React from 'react';
import './App.css';
import { useRoutes, RouteObject } from 'react-router-dom';
import routes from './App.route';
import { useCategories } from '$modules/management/categories/hooks/useCategories';
import { useSetRecoilState } from 'recoil';
import categories from '$recoils/categories/atom';
function App() {
  const setCategories = useSetRecoilState(categories);
  useCategories({
    onSuccess: (data) => {
      const result = data.reduce(
        (pre, { category1, category2, category3, functionalGroup }) => {
          if (!Object.prototype.hasOwnProperty.call(pre, category1)) {
            //category 제품 | 제품외
            pre[category1] = {};
          }
          if (!Object.prototype.hasOwnProperty.call(pre[category1], category2)) {
            // family 제품군
            pre[category1][category2] = {
              functionalGroup: [],
              product: [],
            };
          }

          const newProduct = new Set([...pre[category1][category2].product]);
          newProduct.add(category3);
          pre[category1][category2].product = [...newProduct];

          if (functionalGroup) {
            const newFunctionGroup = new Set([
              ...pre[category1][category2].functionalGroup,
            ]);
            newFunctionGroup.add(functionalGroup);
            pre[category1][category2].functionalGroup = [...newFunctionGroup];
          }

          return pre;
        },
        {},
      );
      setCategories(result);
    },
  });
  const element = useRoutes(routes as RouteObject[]);
  return <>{element}</>;
}

export default App;
