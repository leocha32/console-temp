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
            pre[category1] = {};
          }
          if (!Object.prototype.hasOwnProperty.call(pre[category1], category2)) {
            pre[category1][category2] = {};
          }
          if (
            !Object.prototype.hasOwnProperty.call(pre[category1][category2], category3)
          ) {
            pre[category1][category2][category3] = [];
          }

          if (functionalGroup) {
            const newFunctionGroup = new Set([...pre[category1][category2][category3]]);
            newFunctionGroup.add(functionalGroup);
            pre[category1][category2][category3] = [...newFunctionGroup];
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
