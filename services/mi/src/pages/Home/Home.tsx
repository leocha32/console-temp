import React from 'react';
import { PageLayout } from 'mi-ui';
import RecentMenu from './components/RecentMenu';
const Home = () => {
  return (
    <PageLayout headerName={'Home'}>
      <RecentMenu />
    </PageLayout>
  );
};

export default Home;
