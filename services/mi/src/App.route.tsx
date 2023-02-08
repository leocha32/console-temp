import React, { lazy } from 'react';
import { IRoutes } from 'mi-ui';
import { Layout } from 'components/Layout';
import { FormType } from '$utils/hooks';
import menus from '$constants/menus';

import Logout from '$pages/Logout';
import Unauthorized from '$pages/Unauthorized';

const Home = lazy(() => import('pages/Home'));
const Report = lazy(() => import('pages/Report'));
// 시장 현황
const MarketConditions = lazy(() => import('pages/Report/MarketConditions'));
const SalesVolume = lazy(() => import('pages/Report/MarketConditions/SalesVolume'));
const BrandAwareness = lazy(() => import('pages/Report/MarketConditions/BrandAwareness'));
// const MarketExecutiveSummary = lazy(
//   () => import('pages/Report/MarketConditions/ExecutiveSummary'),
// );
const MarketShare = lazy(() => import('pages/Report/MarketConditions/MarketShare'));

// 계정 및 판매
const AccountsSales = lazy(() => import('pages/Report/AccountsSales'));
const Account = lazy(() => import('pages/Report/AccountsSales/Account'));
const AccountHoldingCombine = lazy(
  () => import('pages/Report/AccountsSales/AccountHoldingCombine'),
);
const WarriorSales = lazy(() => import('pages/Report/AccountsSales/WarriorSales'));
const SalesOrganization = lazy(
  () => import('pages/Report/AccountsSales/SalesOrganization'),
);
const Customer = lazy(() => import('pages/Report/AccountsSales/Customer'));
const AccountExecutiveSummary = lazy(
  () => import('pages/Report/AccountsSales/ExecutiveSummary'),
);
// 마케팅
const Marketing = lazy(() => import('pages/Report/Marketing'));

const Atl = lazy(() => import('pages/Report/Marketing/Atl'));
const KeywordAnalysis = lazy(() => import('pages/Report/Marketing/KeywordAnalysis'));
const MarketingCostsEfficiency = lazy(
  () => import('pages/Report/Marketing/MarketingCostsEfficiency'),
);
const Digital = lazy(() => import('pages/Report/Marketing/Digital'));

//관리
const Management = lazy(() => import('pages/Management'));
const Administrator = lazy(() => import('pages/Management/Administrator'));
const User = lazy(() => import('pages/Management/Administrator/User'));
const UserList = lazy(() => import('pages/Management/Administrator/User/List'));
const UserForm = lazy(() => import('pages/Management/Administrator/User/Form'));

const elementObj = {
  layout: <Layout />,
  home: <Home />,
  report: <Report />,
  research: <MarketConditions />,
  marketShare: <MarketShare />,
  salesVolume: <SalesVolume />,
  brandAwareness: <BrandAwareness />,
  account: <AccountsSales />,
  accountExecutiveSummary: <AccountExecutiveSummary />,
  status: <Account />,
  combination: <AccountHoldingCombine />,
  customer: <Customer />,
  sales: <WarriorSales />,
  salesOrganization: <SalesOrganization />,
  marketing: <Marketing />,
  marketingCostsEfficiency: <MarketingCostsEfficiency />,
  atl: <Atl />,
  digital: <Digital />,
  keywordAnalysis: <KeywordAnalysis />,
  management: <Management />,
  data: <></>,
  dataResearch: <></>,
  brand: <></>,
  performance: <></>,
  administrator: <Administrator />,
  user: <User />,
  userList: <UserList />,
  addUserForm: <UserForm formType={FormType.ADD} title={'사용자 추가'} />,
  editUserForm: <UserForm formType={FormType.EDIT} title={'사용자 수정'} />,
  logout: <Logout />,
  unauthorized: <Unauthorized />,
};

const getMenu = (menu) => {
  return menu?.map(({ elementKey, children, ...menu }) => {
    const child = getMenu(children);
    return {
      ...menu,
      element: elementObj[elementKey],
      children: child,
    };
  });
};

const routes: IRoutes[] = getMenu(menus);

export default routes;
