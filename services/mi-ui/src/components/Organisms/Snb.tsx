import React, { ReactElement, useCallback, useMemo, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer as MuiDrawer,
  IconButton,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  ListItemText,
  ListItemIcon as MuiListItemIcon,
} from '@mui/material';
import { TMenu } from '../../types';
import { Dropdown, Tooltip } from '../Atoms';
export interface IMenuStatus {
  expands: string[];
  open: boolean;
}
export interface ISnbProps {
  menu: TMenu[];
  width?: number;
  minWidth?: number;
  menuStatusHook: [IMenuStatus, (menu: IMenuStatus) => void];
  footer?: ReactElement;
}

const Drawer = styled(MuiDrawer)(
  {
    position: 'relative',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
  ({
    width,
    open,
    minwidth,
    theme,
  }: {
    width: number;
    open: boolean;
    minwidth: number;
    theme?: Theme;
  }) => ({
    ...(open
      ? {
          ...{
            width: width,
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflowX: 'hidden',
          },
          '& .MuiDrawer-paper': {
            width: width,
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflowX: 'hidden',
            position: 'unset',
            background: theme?.color.primary.PRIMARY_700,
            color: theme?.color.mono.MONO_WHITE,
            justifyContent: 'space-between',
          },
        }
      : {
          ...{
            transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflow: 'hidden',
            width: `${minwidth}px`,
          },
          '& .MuiDrawer-paper': {
            transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflowX: 'hidden',
            width: `${minwidth}px`,
            position: 'unset',
            background: theme?.color.primary.PRIMARY_700,
            color: theme?.color.mono.MONO_WHITE,
            justifyContent: 'space-between',
          },
        }),
  }),
);

const SnbFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: ${({ open }: { open: boolean }) =>
    open ? 'space-between' : 'center'};
`;

const FooterIconButton = styled(IconButton)(
  {},
  ({ open, theme }: { open: boolean; theme?: Theme }) => ({
    transform: open ? 'rotate(180deg)' : 'none',
    color: theme?.color.mono.MONO_WHITE,
  }),
);

const DrawerHeader = styled.div`
  display: flex;
  justify-content: ${({ open }: { open: boolean }) => (open ? 'end' : 'center')};
`;

const MenuWrap = styled.div`
  min-height: 100px;
  overflow-y: auto;
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
interface IMenuListProps {
  menus: TMenu[];
  depth?: number;
  expands: string[];
  onClick: (props: IMenuClickProps) => void;
  pathname: string;
  parentPath?: string;
  open: boolean;
}
interface IMenuClickProps {
  hasChildren: boolean;
  path: string;
}

const ListItemIcon = ({
  depth,
  icon,
}: {
  depth: number;
  icon: ReactNode;
}): ReactElement => (
  <MuiListItemIcon
    sx={{
      paddingLeft: `${15 * (depth - 1)}px`,
      minWidth: 0,
      color: 'white',
      justifyContent: 'center',
    }}
  >
    {icon}
  </MuiListItemIcon>
);

const makeOptions = (children, parentPath) => {
  return children?.map(({ children, path, label }) => {
    return {
      label,
      key: `${parentPath}/${path}`,
      children: makeOptions(children, `${parentPath}/${path}`),
    };
  });
};

const makeList = ({
  menus,
  depth = 0,
  expands = [],
  onClick,
  pathname = '',
  parentPath = '',
  open,
}: IMenuListProps) => {
  depth++;
  return (
    <List disablePadding>
      {menus.map(({ label = '', children = [], path: originPath = '', icon }) => {
        const subMenu = children?.filter((child) => !child.index && !child.hidden);
        const hasChildren = !!subMenu.length;
        const path = `${parentPath}/${originPath}`;
        const active = pathname?.startsWith(path) && ((open && !hasChildren) || !open);
        return (
          <ListItem
            disablePadding
            key={path}
            css={(theme) => `
              background-color: ${
                active ? theme?.color.primary.PRIMARY_900 : 'transparent'
              };
              box-shadow: ${
                depth === 1 ? 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)' : 'none'
              };
            `}
          >
            {hasChildren && !open ? (
              <Dropdown
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                Component={(props) => (
                  <ListItemButton {...props} ref={props.anchorEl}>
                    <ListItemIcon depth={depth} icon={icon} />
                  </ListItemButton>
                )}
                options={makeOptions(children, path)}
                onClickOption={(key) => {
                  onClick({ hasChildren: false, path: key });
                }}
              />
            ) : (
              <ListItemButton onClick={() => onClick({ hasChildren, path })}>
                {icon && (
                  <Tooltip title={label} placement={'right'} disableHoverListener={open}>
                    <MuiListItemIcon
                      sx={{
                        paddingLeft: `${15 * (depth - 1)}px`,
                        minWidth: 0,
                        color: 'white',
                        justifyContent: 'center',
                      }}
                    >
                      {icon}
                    </MuiListItemIcon>
                  </Tooltip>
                )}
                <ListItemText
                  primary={label}
                  css={css`
                    padding-left: ${icon ? 15 : 20 * depth + 15}px;
                  `}
                />
                {hasChildren ? <KeyboardArrowDownIcon /> : null}
              </ListItemButton>
            )}

            {open && hasChildren && expands.includes(path)
              ? makeList({
                  menus: subMenu,
                  onClick,
                  expands,
                  depth,
                  open,
                  pathname,
                  parentPath: path,
                })
              : null}
          </ListItem>
        );
      })}
    </List>
  );
};

export const Snb = ({
  menuStatusHook,
  width = 260,
  minWidth = 55,
  footer,
  menu,
}: ISnbProps) => {
  const [{ open, expands }, onSetMenuStatus] = menuStatusHook;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menus = useMemo(
    () =>
      menu
        ?.find((route) => (route.path = '/'))
        ?.children?.filter((child) => !child?.index) || [],
    [menu],
  );

  const handleDrawerToggle = useCallback(() => {
    onSetMenuStatus({
      expands,
      open: !open,
    });
  }, [onSetMenuStatus, open, expands]);

  const handleMenuItemClick = useCallback(
    ({ hasChildren, path }: IMenuClickProps) => {
      if (hasChildren) {
        const newExpand = [...expands];
        const findIndex = newExpand.findIndex((menu) => menu === path);
        if (findIndex !== -1) {
          newExpand.splice(findIndex, 1);
        } else {
          newExpand.push(path);
        }
        onSetMenuStatus({
          open,
          expands: newExpand,
        });
      } else {
        navigate(path);
      }
    },
    [expands, navigate, onSetMenuStatus, open],
  );

  return (
    <Drawer variant="permanent" open={open} width={width} minwidth={minWidth}>
      <MenuWrap>
        <DrawerHeader open={open}>
          <IconButton
            css={(theme) => ({ color: theme.color.mono.MONO_WHITE })}
            onClick={handleDrawerToggle}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        {makeList({ menus, expands, onClick: handleMenuItemClick, pathname, open })}
      </MenuWrap>

      <SnbFooter open={open}>
        <>
          {open && footer}
          <FooterIconButton onClick={handleDrawerToggle} open={open}>
            <KeyboardDoubleArrowRightIcon />
          </FooterIconButton>
        </>
      </SnbFooter>
    </Drawer>
  );
};
