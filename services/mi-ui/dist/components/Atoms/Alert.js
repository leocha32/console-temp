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
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
export var Type;
(function (Type) {
    Type["INFO"] = "info";
    Type["ERROR"] = "error";
})(Type || (Type = {}));
export const Alert = (_a) => {
    var { open, title, text, onClose, disableEscapeKeyDown, disableBackdropClick, type = Type.INFO, buttonText = '닫기' } = _a, props = __rest(_a, ["open", "title", "text", "onClose", "disableEscapeKeyDown", "disableBackdropClick", "type", "buttonText"]);
    const handleClose = (event, reason) => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return false;
        }
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
            return false;
        }
        if (typeof onClose === 'function') {
            onClose();
        }
    };
    return (_jsxs(Dialog, Object.assign({}, props, { open: open, onClose: handleClose }, { children: [_jsxs(DialogTitle, Object.assign({ sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                }, color: type === Type.INFO ? 'green' : 'red' }, { children: [_jsx(InfoIcon, {}), _jsx(Box, { children: title })] })), _jsx(DialogContent, Object.assign({ sx: { height: '200px', width: '400px' } }, { children: _jsx(DialogContentText, { children: text }) })), _jsx(DialogActions, { children: _jsx(Button, Object.assign({ onClick: onClose }, { children: buttonText })) })] })));
};
export const SampleAlert = (_a) => {
    var props = __rest(_a, []);
    const [openState, setOpenState] = useState(false);
    const handleOpen = () => {
        setOpenState(true);
    };
    const handleClose = () => {
        setOpenState(false);
    };
    return (_jsxs("div", { children: [_jsx(Button, Object.assign({ variant: "outlined", onClick: handleOpen }, { children: "\uD074\uB9AD" })), _jsx(Alert, Object.assign({}, props, { open: openState, onClose: handleClose }))] }));
};
