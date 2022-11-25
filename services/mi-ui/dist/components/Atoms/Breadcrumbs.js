var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Breadcrumbs as MuiBreadcrumbs, } from '@mui/material';
import styled from '@emotion/styled';
const CrumbWrap = styled.span `
  font-size: 14px;
  cursor: default;
  display: flex;
`;
const Crumb = ({ icon, name }) => {
    return (_jsxs(CrumbWrap, { children: [icon, name] }));
};
export const Breadcrumbs = (_a) => {
    var { separator = '›' } = _a, props = __rest(_a, ["separator"]);
    return (_jsx(MuiBreadcrumbs, Object.assign({ separator: separator }, props, { children: props.crumbs.map((crumb, index) => (_jsx(Crumb, Object.assign({}, crumb), index))) })));
};
