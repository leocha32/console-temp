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
import { useCallback } from 'react';
import { Tabs as MuiTabs, Tab } from '@mui/material';
export const Tabs = (_a) => {
    var { value, items, onChange } = _a, props = __rest(_a, ["value", "items", "onChange"]);
    const handleChange = useCallback((event, value) => {
        if (onChange instanceof Function) {
            onChange(event, value);
        }
    }, [onChange]);
    return (_jsx(MuiTabs, Object.assign({}, props, { onChange: handleChange, value: value }, { children: items === null || items === void 0 ? void 0 : items.map((item) => (_jsx(Tab, Object.assign({}, item), item.value))) })));
};
