import React, { ReactNode, useCallback, useState, useMemo, useRef } from 'react';
import { MenuItem, MenuItemProps, Menu } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface INestedItemProps extends MenuItemProps {
  parentMenuOpen: boolean;
  component?: React.ElementType;
  label?: React.ReactNode;
  icon?: ReactNode;
}
export const NestedItem = ({
  parentMenuOpen,
  disabled,
  children,
  label,
  icon = (
    <ArrowForwardIosIcon
      sx={{
        width: '14px',
        height: '14px',
        paddingLeft: '6px',
      }}
    />
  ),
  ...menuItemProps
}: INestedItemProps) => {
  const menuItemRef = useRef<any>();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(
    (open: boolean) => {
      if (disabled) {
        return;
      }
      setMenuOpen(open);
    },
    [disabled],
  );

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

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MenuItem {...menuItemProps} disabled={disabled} ref={menuItemRef}>
        {label}
        {icon}
      </MenuItem>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        style={{ pointerEvents: 'none' }}
        anchorEl={menuItemRef.current}
        open={open}
        onClose={handleClose}
      >
        <div style={{ pointerEvents: 'auto' }}>{children}</div>
      </Menu>
    </div>
  );
};
