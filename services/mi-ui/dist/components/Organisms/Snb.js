import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer as MuiDrawer, IconButton, List as MuiList, ListItem as MuiListItem, ListItemButton as MuiListItemButton, ListItemText, ListItemIcon as MuiListItemIcon, } from '@mui/material';
import { Dropdown, Tooltip } from '../Atoms';
const Drawer = styled(MuiDrawer)({
    position: 'relative',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
}, ({ width, open, minwidth, theme, }) => (Object.assign({}, (open
    ? Object.assign({
        width: width,
        transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        overflowX: 'hidden',
    }, { '& .MuiDrawer-paper': {
            width: width,
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflowX: 'hidden',
            position: 'unset',
            background: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_700,
            color: theme === null || theme === void 0 ? void 0 : theme.color.mono.MONO_WHITE,
            justifyContent: 'space-between',
        } }) : Object.assign({
    transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    overflow: 'hidden',
    width: `${minwidth}px`,
}, { '& .MuiDrawer-paper': {
        transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        overflowX: 'hidden',
        width: `${minwidth}px`,
        position: 'unset',
        background: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_700,
        color: theme === null || theme === void 0 ? void 0 : theme.color.mono.MONO_WHITE,
        justifyContent: 'space-between',
    } })))));
const SnbFooter = styled.div `
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: ${({ open }) => open ? 'space-between' : 'center'};
`;
const FooterIconButton = styled(IconButton)({}, ({ open, theme }) => ({
    transform: open ? 'rotate(180deg)' : 'none',
    color: theme === null || theme === void 0 ? void 0 : theme.color.mono.MONO_WHITE,
}));
const DrawerHeader = styled.div `
  display: flex;
  justify-content: ${({ open }) => (open ? 'end' : 'center')};
`;
const MenuWrap = styled.div `
  min-height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar-thumb {
    background: #d3d1cb;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_700};
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
`;
const List = styled(MuiList)({
    width: '100%',
});
const ListItem = styled(MuiListItem)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40px',
});
const ListItemButton = styled(MuiListItemButton)({
    width: '100%',
});
const ListItemIcon = ({ depth, icon, }) => (_jsx(MuiListItemIcon, Object.assign({ sx: {
        paddingLeft: `${15 * (depth - 1)}px`,
        minWidth: 0,
        color: 'white',
        justifyContent: 'center',
    } }, { children: icon })));
const makeOptions = (children, parentPath) => {
    return children === null || children === void 0 ? void 0 : children.map(({ children, path, label }) => {
        return {
            label,
            key: `${parentPath}/${path}`,
            children: makeOptions(children, `${parentPath}/${path}`),
        };
    });
};
const makeList = ({ menus, depth = 0, expands = [], onClick, pathname = '', parentPath = '', open, parentLabels = [], }) => {
    depth++;
    return (_jsx(List, Object.assign({ disablePadding: true }, { children: menus.map(({ label = '', children = [], path: originPath = '', icon }) => {
            const subMenu = children === null || children === void 0 ? void 0 : children.filter((child) => !child.index && !child.hidden);
            const hasChildren = !!subMenu.length;
            const path = `${parentPath}/${originPath}`;
            const active = (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith(path)) &&
                pathname.endsWith(originPath) &&
                ((open && !hasChildren) || !open);
            return (_jsxs(ListItem, Object.assign({ disablePadding: true, css: (theme) => `
              background-color: ${active ? theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_900 : 'transparent'};
              box-shadow: ${depth === 1 ? 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)' : 'none'};
            ` }, { children: [hasChildren && !open ? (_jsx(Dropdown, { anchorOrigin: { vertical: 'top', horizontal: 'right' }, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        }, Component: (props) => (_jsx(ListItemButton, Object.assign({}, props, { ref: props.anchorEl }, { children: _jsx(ListItemIcon, { depth: depth, icon: icon }) }))), options: makeOptions(children, path), onClickOption: (key) => {
                            onClick({
                                hasChildren: false,
                                currentInfo: { path: key, label },
                                parentLabels,
                            });
                        } })) : (_jsxs(ListItemButton, Object.assign({ onClick: () => onClick({ hasChildren, currentInfo: { path, label }, parentLabels }) }, { children: [icon && (_jsx(Tooltip, Object.assign({ title: label, placement: 'right', disableHoverListener: open }, { children: _jsx(MuiListItemIcon, Object.assign({ sx: {
                                        paddingLeft: `${15 * (depth - 1)}px`,
                                        minWidth: 0,
                                        color: 'white',
                                        justifyContent: 'center',
                                    } }, { children: icon })) }))), _jsx(ListItemText, { primary: label, css: css `
                    padding-left: ${icon ? 15 : 20 * depth + 15}px;
                  ` }), hasChildren ? _jsx(KeyboardArrowDownIcon, {}) : null] }))), open && hasChildren && expands.includes(path)
                        ? makeList({
                            menus: subMenu,
                            onClick,
                            expands,
                            depth,
                            open,
                            pathname,
                            parentPath: path,
                            parentLabels: [...parentLabels, label],
                        })
                        : null] }), path));
        }) })));
};
export const Snb = ({ menuStatusHook, width = 260, minWidth = 55, footer, menu, onClickMenu, }) => {
    const [{ open, expands }, onSetMenuStatus] = menuStatusHook;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const menus = useMemo(() => {
        var _a, _b;
        return ((_b = (_a = menu === null || menu === void 0 ? void 0 : menu.find((route) => (route.path = '/'))) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.filter((child) => !(child === null || child === void 0 ? void 0 : child.index))) || [];
    }, [menu]);
    const handleDrawerToggle = useCallback(() => {
        onSetMenuStatus({
            expands,
            open: !open,
        });
    }, [onSetMenuStatus, open, expands]);
    const handleMenuItemClick = useCallback(({ hasChildren, currentInfo, parentLabels }) => {
        const { path } = currentInfo;
        if (hasChildren) {
            const newExpand = [...expands];
            const findIndex = newExpand.findIndex((menu) => menu === path);
            if (findIndex !== -1) {
                newExpand.splice(findIndex, 1);
            }
            else {
                newExpand.push(path);
            }
            onSetMenuStatus({
                open,
                expands: newExpand,
            });
        }
        else {
            if (onClickMenu instanceof Function) {
                onClickMenu({ currentInfo, parentLabels });
            }
            navigate(path);
        }
    }, [expands, navigate, onSetMenuStatus, onClickMenu, open]);
    return (_jsxs(Drawer, Object.assign({ variant: "permanent", open: open, width: width, minwidth: minWidth }, { children: [_jsxs(MenuWrap, { children: [_jsx(DrawerHeader, Object.assign({ open: open }, { children: _jsx(IconButton, Object.assign({ css: (theme) => ({ color: theme.color.mono.MONO_WHITE }), onClick: handleDrawerToggle }, { children: open ? _jsx(CloseIcon, {}) : _jsx(MenuIcon, {}) })) })), makeList({ menus, expands, onClick: handleMenuItemClick, pathname, open })] }), _jsx(SnbFooter, Object.assign({ open: open }, { children: _jsxs(_Fragment, { children: [open && footer, _jsx(FooterIconButton, Object.assign({ onClick: handleDrawerToggle, open: open }, { children: _jsx(KeyboardDoubleArrowRightIcon, {}) }))] }) }))] })));
};
