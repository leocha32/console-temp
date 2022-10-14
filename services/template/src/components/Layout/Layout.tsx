import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div>Header</div>
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
