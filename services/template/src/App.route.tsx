import React, { lazy } from 'react';

import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
const Sample = lazy(() => import('pages/Sample'));
const Page1 = lazy(() => import('pages/Sample/Page1'));
const Page2 = lazy(() => import('pages/Sample/Page2'));

const routes = [
  {
    page: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <>
            Home <Link to="sample">samplePage</Link>
          </>
        ),
      },
      {
        path: 'sample',
        element: <Sample />,
        children: [
          { index: true, element: <Page1 /> },
          { path: 'page1', element: <Page1 /> },
          { path: 'page2', element: <Page2 /> },
        ],
      },
    ],
  },
];
export default routes;
