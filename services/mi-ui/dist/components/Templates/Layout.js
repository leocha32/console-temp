import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Suspense } from 'react';
import { Header, Snb } from '../Organisms';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
const Main = styled.main `
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
const Section = styled.div `
  background-color: ${(props) => props.theme.palettes.gray.GRAY_100};
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
`;
const Wrap = styled.div `
  padding: 20px 30px 40px;
  flex: 1;
`;
export const Layout = ({ menu, menuStatusHook, onClickLogo, header, onClickMenu, }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Header, Object.assign({ onClick: onClickLogo }, { children: header })), _jsxs(Main, { children: [_jsx(Snb, { menu: menu, menuStatusHook: menuStatusHook, onClickMenu: onClickMenu }), _jsx(Section, { children: _jsx(Wrap, { children: _jsx(Suspense, { children: _jsx(Outlet, {}) }) }) })] })] }));
};
