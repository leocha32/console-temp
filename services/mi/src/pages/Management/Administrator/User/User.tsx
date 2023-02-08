import { Outlet } from 'react-router-dom';
import React from 'react';
import { PageLayout } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';

const TITLE = 'User';
const User = () => {
  return (
    <>
      <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
        <Outlet />
      </PageLayout>
    </>
  );
};

export default User;
