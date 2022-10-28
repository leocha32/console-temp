import React, { lazy } from 'react';
import { TMenu } from 'mi-ui';
import Layout from 'components/Layout';
const Home = lazy(() => import('pages/Home'));
const Report = lazy(() => import('pages/Report'));
const MarketConditions = lazy(() => import('pages/Report/MarketConditions'));
const SalesVolume = lazy(() => import('pages/Report/MarketConditions/SalesVolume'));

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
              {
                path: 'summary',
                label: 'Executive Summary',
              },
              {
                path: 'share',
                label: '시장 점유율(M/S)',
              },
              {
                path: 'sales',
                label: '시판 판매량',
                element: <SalesVolume />,
              },
              {
                path: 'awareness',
                label: '브랜드 인지도',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
