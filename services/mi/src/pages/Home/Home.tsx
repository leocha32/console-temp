import React from 'react';
import { PageLayout, HeaderTitle } from 'mi-ui';
import RecentMenu from './components/RecentMenu';

const Home = () => {
  return (
    <PageLayout header={<HeaderTitle>Home</HeaderTitle>}>
      <RecentMenu />
    </PageLayout>
  );
};

export default Home;
