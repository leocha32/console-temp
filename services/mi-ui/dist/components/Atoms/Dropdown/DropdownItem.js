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
import { createElement as _createElement } from "@emotion/react";
import { useCallback } from 'react';
import { MenuItem } from '@mui/material';
export const DropdownItem = (_a) => {
    var { option, onClickOption } = _a, props = __rest(_a, ["option", "onClickOption"]);
    const handleClickItem = useCallback((key) => {
        if (onClickOption instanceof Function) {
            onClickOption(key);
        }
    }, [onClickOption]);
    return (_createElement(MenuItem, Object.assign({}, props, { key: option.key, onClick: () => handleClickItem(option.key), disabled: option.disabled }), option.label));
};
