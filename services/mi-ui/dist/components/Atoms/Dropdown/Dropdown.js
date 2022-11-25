import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useState, useRef, useCallback } from 'react';
import { Menu, Button } from '@mui/material';
import { NestedItem } from './NestedItem';
import { DropdownItem } from './DropdownItem';
export const renderMenu = (options, open, onClickOption) => {
    return options === null || options === void 0 ? void 0 : options.map((option) => {
        return option.children ? (_jsx(NestedItem, Object.assign({ label: option.label, disabled: option.disabled, parentMenuOpen: open }, { children: renderMenu(option.children, open, onClickOption) }), option.key)) : (_jsx(DropdownItem, { option: option, onClickOption: onClickOption }, option.key));
    });
};
export const Dropdown = ({ onClickOption, buttonProps, title, options, Component, anchorOrigin = { vertical: 'bottom', horizontal: 'center' }, transformOrigin = { vertical: 'top', horizontal: 'center' }, }) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);
    const handleItemClick = useCallback((key) => {
        if (onClickOption instanceof Function) {
            onClickOption(key);
        }
        setOpen(false);
    }, [onClickOption]);
    return (_jsxs("div", { children: [Component ? (_jsx(Component, { anchorEl: anchorRef, onClick: handleOpen })) : (_jsx(Button, Object.assign({ ref: anchorRef, onClick: handleOpen }, buttonProps, { children: title }))), _jsx(Menu, Object.assign({ open: open, onClose: handleClose, anchorEl: anchorRef.current, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, style: { marginTop: '4px' } }, { children: renderMenu(options, open, handleItemClick) }))] }));
};
