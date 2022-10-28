import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout } from 'mi-ui/src';

const Sample = () => {
  return (
    <PageLayout header={<></>}>
      <div>Sample Page</div>
      <Outlet />
    </PageLayout>
  );
};

export default Sample;
