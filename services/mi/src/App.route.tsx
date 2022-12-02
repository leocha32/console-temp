import React, { lazy } from 'react';
import { TMenu } from 'mi-ui';
import Layout from 'components/Layout';
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
const Digital = lazy(() => import('pages/Report/Marketing/Digital'));
const MarketingCostsEfficiency = lazy(
  () => import('pages/Report/Marketing/MarketingCostsEfficiency'),
);
import SummarizeIcon from '@mui/icons-material/Summarize';

export const routes: TMenu[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'report',
        label: '리포트',
        element: <Report />,
        icon: <SummarizeIcon />,
        children: [
          {
            path: 'market-conditions',
            label: '시장 현황',
            element: <MarketConditions />,
            children: [
              // {
              //   path: 'summary',
              //   label: 'Executive Summary',
              //   element: <MarketExecutiveSummary />,
              // },
              {
                path: 'share',
                label: '시장 점유율',
                element: <MarketShare />,
              },
              {
                path: 'sales',
                label: '시판 판매량',
                element: <SalesVolume />,
              },
              {
                path: 'awareness',
                label: '브랜드 인지도',
                element: <BrandAwareness />,
              },
            ],
          },
          {
            path: 'accounts-sales',
            label: '계정 및 판매',
            element: <AccountsSales />,
            children: [
              {
                path: 'summary',
                label: 'Executive Summary',
                element: <AccountExecutiveSummary />,
              },
              {
                path: 'account',
                label: '계정',
                element: <Account />,
              },
              {
                path: 'account-holding-combine',
                label: '계정 보유 조합',
                element: <AccountHoldingCombine />,
              },
              {
                path: 'customer',
                label: '고객',
                element: <Customer />,
              },
              {
                path: 'warrior-sales',
                label: '전사 판매',
                element: <WarriorSales />,
              },
              {
                path: 'sales-organization',
                label: '조직별 판매',
                element: <SalesOrganization />,
              },
            ],
          },
          {
            path: 'marketing',
            label: '마케팅',
            element: <Marketing />,
            children: [
              {
                path: 'marketing-costs-efficiency',
                label: '마케팅 비용 및 효율',
                element: <MarketingCostsEfficiency />,
              },
              {
                path: 'atl',
                label: 'ATL',
                element: <Atl />,
              },
              {
                path: 'digital',
                label: 'Digital',
                element: <Digital />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
