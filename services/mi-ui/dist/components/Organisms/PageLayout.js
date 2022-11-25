import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Breadcrumbs } from '../Atoms';
const Wrap = styled.div `
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div `
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
export const HeaderTitle = styled.h2 `
  color: #191f28;
  margin: 0;
`;
export const Body = styled.div `
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const PageLayout = forwardRef(function PageLayout({ children, headerName, crumbs = [] }, ref) {
    return (_jsxs(Wrap, Object.assign({ ref: ref }, { children: [_jsxs(Header, { children: [_jsx(HeaderTitle, { children: headerName }), _jsx(Breadcrumbs, { crumbs: crumbs })] }), _jsx(Body, { children: children })] })));
});
