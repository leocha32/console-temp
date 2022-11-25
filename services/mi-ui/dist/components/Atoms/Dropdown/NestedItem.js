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
import { useCallback, useState, useMemo, useRef } from 'react';
import { MenuItem, Menu } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export const NestedItem = (_a) => {
    var { parentMenuOpen, disabled, children, label, icon = (_jsx(ArrowForwardIosIcon, { sx: {
            width: '14px',
            height: '14px',
            paddingLeft: '6px',
        } })) } = _a, menuItemProps = __rest(_a, ["parentMenuOpen", "disabled", "children", "label", "icon"]);
    const menuItemRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuToggle = useCallback((open) => {
        if (disabled) {
            return;
        }
        setMenuOpen(open);
    }, [disabled]);
    const handleClose = useCallback(() => {
        setMenuOpen(false);
    }, []);
    const handleMouseEnter = useCallback(() => {
        handleMenuToggle(true);
    }, [handleMenuToggle]);
    const handleMouseLeave = useCallback(() => {
        handleMenuToggle(false);
    }, [handleMenuToggle]);
    const open = useMemo(() => menuOpen && parentMenuOpen, [menuOpen, parentMenuOpen]);
    return (_jsxs("div", Object.assign({ onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, { children: [_jsxs(MenuItem, Object.assign({}, menuItemProps, { disabled: disabled, ref: menuItemRef }, { children: [label, icon] })), _jsx(Menu, Object.assign({ anchorOrigin: { vertical: 'top', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'left' }, style: { pointerEvents: 'none' }, anchorEl: menuItemRef.current, open: open, onClose: handleClose }, { children: _jsx("div", Object.assign({ style: { pointerEvents: 'auto' } }, { children: children })) }))] })));
};
