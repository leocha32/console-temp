import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'mi-ui';
const Layout = () => {
  const handleClickLogo = () => {
    window.open('/', '_self');
  };

  return (
    <>
      <Header onClick={handleClickLogo}>Header</Header>
      <div>
        <div>SNB</div>
        <section>
          <Suspense>
            <Outlet />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default Layout;
