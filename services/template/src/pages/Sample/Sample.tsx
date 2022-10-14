import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
const Sample = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div>
        Sample Page
        <Link to="page1">page1</Link>
        <Link to="page2">page2</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Sample;
