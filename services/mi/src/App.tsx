import React from 'react';
import './App.css';
import { useRoutes, RouteObject } from 'react-router-dom';
import routes from './App.route';
import { useCategories } from '$modules/management/categories/hooks/useCategories';
import { useSelectableItems } from '$modules/report/research/hooks/useSelectableItems';
import { useSetRecoilState, RecoilRoot } from 'recoil';
import categories from '$recoils/categories/atom';
import selectableItems from '$recoils/resarchSelectItem/atom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import useAlert from '$utils/hooks/useAlert';
import { IApiError } from '$types/api-error';
import { Type } from 'mi-ui/src';

const AppElement = () => {
  const setCategories = useSetRecoilState(categories);
  const setResearchSelectableItems = useSetRecoilState(selectableItems);
  useSelectableItems({
    onSuccess: (data) => {
      setResearchSelectableItems(data);
    },
  });
  useCategories({
    onSuccess: (data) => {
      const result = data
        .sort((a, b) => a.seqNum - b.seqNum)
        .reduce((pre, { category1, category2, category3, functionalGroup }) => {
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
        }, {});
      setCategories(result);
    },
  });
  return useRoutes(routes as RouteObject[]);
};

function App() {
  const alert = useAlert({ title: '오류', type: Type.ERROR });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: 0,
        refetchOnWindowFocus: false,
        onError: (e) => {
          alert.open((e as IApiError)?.errorCause || '에러가 발생했습니다.');
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppElement />
        {alert.rendered}
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
