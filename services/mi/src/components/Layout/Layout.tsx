import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import { Layout as CLayout } from 'mi-ui';
import routes from 'App.route';
import { useRecoilState, useSetRecoilState } from 'recoil';
import menu from 'recoils/menu';
import { recentMenuSelector } from 'recoils/recentMenu';
import logo from '../../assets/images/logo.png';
const Header = (
  <div
    id={'layout-header'}
    css={css`
      font-size: 24px;
      font-weight: 700;
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
  >
    <img
      src={logo}
      css={css`
        position: sticky;
        height: 100px;
      `}
    />
    <span
      css={css`
        font-size: 20px;
        font-weight: 500;
      `}
    >
      {`${' MI Platform'}`}
    </span>
  </div>
);
const Layout = () => {
  const setRecentMenu = useSetRecoilState(recentMenuSelector);
  const handleClickLogo = useCallback(() => {
    window.open('/', '_self');
  }, []);

  const onClickMenu = useCallback(
    (params) => {
      setRecentMenu(params);
    },
    [setRecentMenu],
  );

  return (
    <CLayout
      menuStatusHook={useRecoilState(menu)}
      onClickLogo={handleClickLogo}
      menu={routes}
      header={Header}
      onClickMenu={onClickMenu}
    />
  );
};

export default Layout;
