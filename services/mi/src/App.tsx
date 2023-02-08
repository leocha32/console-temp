import React, { useEffect } from 'react';
import './App.css';
import { RouteObject, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import routes from './App.route';
import { useCategories } from '$modules/management/categories/hooks/useCategories';
import { useSelectableItems } from '$modules/report/research/hooks/useSelectableItems';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import categories from '$recoils/categories/atom';
import selectableItems from '$recoils/resarchSelectItem/atom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAlert from '$utils/hooks/useAlert';
import { IApiError } from '$types/api-error';
import { SnackbarProvider, Spinner, Type } from 'mi-ui/src';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useFirebase } from '$utils/hooks';
import { LandingLayout } from '$components/Layout/LandingLayout';
import styled from '@emotion/styled';
import loginUser from '$recoils/user';
import { useUser } from '$modules/management/user';

dayjs.locale('ko');

const ignoreLoginPath = ['/logout', '/unauthorized'];

const BlankWrp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const RoutePage = () => {
  const { pathname } = useLocation();
  const setCategories = useSetRecoilState(categories);
  const setResearchSelectableItems = useSetRecoilState(selectableItems);
  useSelectableItems({
    enabled: !ignoreLoginPath.includes(pathname),
    onSuccess: (data) => {
      setResearchSelectableItems(data);
    },
  });
  useCategories({
    enabled: !ignoreLoginPath.includes(pathname),
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
              product: {
                all: [],
              },
            };
          }

          const newProduct = new Set([...pre[category1][category2].product.all]);
          newProduct.add(category3);
          pre[category1][category2].product.all = [...newProduct];
          if (functionalGroup) {
            const newFunctionGroup = new Set([
              ...pre[category1][category2].functionalGroup,
            ]);
            newFunctionGroup.add(functionalGroup);
            pre[category1][category2]['product'][functionalGroup] = category3;
            pre[category1][category2].functionalGroup = [...newFunctionGroup];
          }

          return pre;
        }, {});
      setCategories(result);
    },
  });
  return useRoutes(routes as RouteObject[]);
};

const AppElement = () => {
  const navigate = useNavigate();
  // const { gapi } = useGoogle();

  const [user, setUser] = useRecoilState(loginUser);
  const { login } = useFirebase();
  const { pathname } = useLocation();
  const { data } = useUser(
    { email: user?.email, authLocation: pathname !== '/unauthorized' },
    {
      enabled: !!user?.email,
      onSuccess: (data) => {
        if (data?.accessibleUri) {
          navigate(ignoreLoginPath.includes(pathname) ? '/' : pathname);
        } else {
          navigate('/unauthorized');
        }
        setUser({
          email: user?.email,
          employeeId: data?.employeeId,
          teamName: data?.department,
          name: data?.name,
          accessibleUri: data?.accessibleUri,
        });
      },
    },
  );

  useEffect(() => {
    if (!ignoreLoginPath.includes(pathname)) {
      login();
    }
  }, []);

  return (
    <>
      {!user.email && !ignoreLoginPath.includes(pathname) ? (
        <LandingLayout headerProps={{}}>
          <BlankWrp>
            <Spinner text={''} />
          </BlankWrp>
        </LandingLayout>
      ) : (
        <RoutePage />
      )}
    </>
  );
};
function App() {
  const alert = useAlert({ title: '오류', type: Type.ERROR });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: 0,
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
        <SnackbarProvider>
          <AppElement />
          {alert.rendered}
        </SnackbarProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
