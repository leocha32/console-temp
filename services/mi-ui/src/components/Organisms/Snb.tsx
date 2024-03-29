import React, { ReactElement, ReactNode, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer as MuiDrawer,
  IconButton,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText,
} from '@mui/material';
import { AccessType, IMenus } from '../../types';
import { Dropdown, Tooltip } from '../Atoms';

export interface IMenuStatus {
  expands: string[];
  open: boolean;
}
export interface ISnbProps {
  menu: IMenus[]; //hidden, index 제거된 상태
  width?: number;
  minWidth?: number;
  menuStatusHook: [IMenuStatus, (menu: IMenuStatus) => void];
  footer?: ReactElement;
  onClickMenu?: ({ currentInfo, parentLabels }) => void;
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
            background: theme?.color.brand.COWAY_BLUE,
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
            background: theme?.color.brand.COWAY_BLUE,
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
  overflow-x: hidden;
  &::-webkit-scrollbar-thumb {
    background: #d3d1cb;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme?.color.brand.COWAY_BLUE};
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
interface IMenuListProps {
  menus: IMenus[];
  depth?: number;
  expands: string[];
  onClick: (props: IMenuClickProps) => void;
  pathname: string;
  parentPath?: string;
  open: boolean;
  parentLabels?: string[];
  parentAccess?: AccessType;
}
interface IMenuClickProps {
  hasChildren: boolean;
  currentInfo: {
    label: string;
    path: string;
  };
  parentLabels?: string[];
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

const makeOptions = (children, parentPath, propsParentAccess) => {
  return children?.map(({ children, path, label, access }) => {
    const parentAccess =
      propsParentAccess === AccessType.ALL ? propsParentAccess : access;

    const filteredChildren = children?.filter((child) => !child.index && !child.hidden);
    const subMenu =
      parentAccess === AccessType.ALL
        ? filteredChildren
        : filteredChildren?.filter(
            (child) =>
              child?.access === AccessType.ALL || child?.access === AccessType.SHOW,
          );

    return {
      label,
      key: `${parentPath}/${path}`,
      children: subMenu?.length
        ? makeOptions(subMenu, `${parentPath}/${path}`, parentAccess)
        : null,
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
  parentLabels = [],
  parentAccess: propsParentAccess,
}: IMenuListProps) => {
  depth++;
  return (
    <List disablePadding>
      {menus.map(({ label = '', children = [], path: originPath = '', icon, access }) => {
        const parentAccess =
          propsParentAccess === AccessType.ALL ? propsParentAccess : access;
        const filteredChildren = children?.filter(
          (child) => !child.index && !child.hidden,
        );
        const subMenu =
          parentAccess === AccessType.ALL
            ? filteredChildren
            : filteredChildren?.filter(
                (child) =>
                  child?.access === AccessType.ALL || child?.access === AccessType.SHOW,
              );
        const hasChildren = !!subMenu.length;
        const path = `${parentPath}/${originPath}`;
        const active =
          pathname?.startsWith(path) &&
          pathname.endsWith(originPath) &&
          ((open && !hasChildren) || !open);
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
                options={makeOptions(subMenu, path, parentAccess)}
                onClickOption={(key) => {
                  onClick({
                    hasChildren: false,
                    currentInfo: { path: key, label },
                    parentLabels,
                  });
                }}
              />
            ) : (
              <ListItemButton
                onClick={() =>
                  onClick({ hasChildren, currentInfo: { path, label }, parentLabels })
                }
              >
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
                  parentLabels: [...parentLabels, label],
                  parentAccess,
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
  onClickMenu,
}: ISnbProps) => {
  const [{ open, expands }, onSetMenuStatus] = menuStatusHook;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menus = useMemo(
    () =>
      menu?.filter(
        ({ access }) => access === AccessType.ALL || access === AccessType.SHOW,
      ) || [],
    [menu],
  );
  const handleDrawerToggle = useCallback(() => {
    onSetMenuStatus({
      expands,
      open: !open,
    });
  }, [onSetMenuStatus, open, expands]);

  const handleMenuItemClick = useCallback(
    ({ hasChildren, currentInfo, parentLabels }: IMenuClickProps) => {
      const { path } = currentInfo;
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
        if (onClickMenu) {
          onClickMenu({ currentInfo, parentLabels });
        }
        navigate(path);
      }
    },
    [expands, navigate, onSetMenuStatus, onClickMenu, open],
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
