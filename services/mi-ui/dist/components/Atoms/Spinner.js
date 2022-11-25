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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { BeatLoader } from 'react-spinners';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
const Wrap = styled.div `
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`;
const ContentWrap = styled.div `
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const TextWrap = styled.div `
  padding-bottom: 20px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_700};
  font-size: 18px;
  font-weight: 600;
`;
export const Spinner = (_a) => {
    var { color } = _a, props = __rest(_a, ["color"]);
    const theme = useTheme();
    return (_jsx(Wrap, { children: _jsxs(ContentWrap, { children: [_jsx(TextWrap, { children: " \uB370\uC774\uD130\uB97C \uC870\uD68C \uC911\uC785\uB2C8\uB2E4." }), _jsx(BeatLoader, Object.assign({ color: color || theme.color.primary.PRIMARY_900, css: css `
            margin: auto;
          ` }, props))] }) }));
};
