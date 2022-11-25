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
import { Button as MuiButton, CircularProgress as MuiProgress, } from '@mui/material';
import { css } from '@emotion/react';
export const Button = (_a) => {
    var { showLoading = false, label, variant = 'outlined', spinnerSize = 15 } = _a, props = __rest(_a, ["showLoading", "label", "variant", "spinnerSize"]);
    return (_jsxs(MuiButton, Object.assign({ variant: variant, sx: { padding: '6px 12px' } }, props, { disabled: props.disabled || showLoading }, { children: [_jsx("span", Object.assign({ css: css `
          opacity: ${showLoading ? 0.3 : 1};
        ` }, { children: label })), showLoading ? (_jsx(MuiProgress, { sx: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: `${-spinnerSize / 2}px`,
                    marginLeft: `${-spinnerSize / 2}px`,
                }, size: spinnerSize })) : null] })));
};
