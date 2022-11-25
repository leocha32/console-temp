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
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { css } from '@emotion/react';
export const BlankLink = (_a) => {
    var { children, isForwardIcon = false } = _a, props = __rest(_a, ["children", "isForwardIcon"]);
    return (_jsxs(Link, Object.assign({ css: css `
        display: flex;
        color: #4285f4;
        align-items: center;
        flex-direction: ${isForwardIcon ? 'row-reverse' : 'row'};
        margin-left: ${isForwardIcon ? '0px' : '5px'};
        margin-right: ${isForwardIcon ? '5px' : '0px'};
      `, target: "_blank" }, props, { children: [children, _jsx(LaunchIcon, { fontSize: "small", css: css `
          margin-left: ${isForwardIcon ? '0px' : '5px'};
          margin-right: ${isForwardIcon ? '5px' : '0px'};
        ` })] })));
};
