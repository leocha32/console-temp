import React from 'react';
import { css } from '@emotion/react';
import { Layout as CLayout } from 'mi-ui';
import routes from 'App.route';
import { useRecoilState, useResetRecoilState } from 'recoil';
import menu from 'recoils/menu';

const Header = (
  <div
    css={css`
      font-size: 24px;
      font-weight: 700;
    `}
  >
    Coway
    <span
      css={css`
        font-size: 20px;
        font-weight: 500;
      `}
    >
      {`${' Platform'}`}
    </span>
  </div>
);
const Layout = () => {
  const setMenuStatus = useResetRecoilState(menu);
  const handleClickLogo = () => {
    setMenuStatus();
    window.open('/', '_self');
  };

  return (
    <CLayout
      menuStatusHook={useRecoilState(menu)}
      onClickLogo={handleClickLogo}
      menu={routes}
      headerProps={{}}
      header={Header}
    />
  );
};

export default Layout;
