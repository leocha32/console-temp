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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Tooltip as MuiTooltip } from '@mui/material';
export const Tooltip = (_a) => {
    var { children, placement = 'top', arrow = true } = _a, props = __rest(_a, ["children", "placement", "arrow"]);
    return (_jsx(MuiTooltip, Object.assign({ placement: placement, arrow: arrow }, props, { children: children })));
};
