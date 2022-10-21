import React, { ElementType, useState, ReactNode, useRef, useCallback } from 'react';
import { Menu, Button, ButtonProps, PopoverOrigin } from '@mui/material';
import { NestedItem } from './NestedItem';
import { DropdownItem } from './DropdownItem';

export interface IOptionProps {
  label: ReactNode;
  key: string;
  disabled?: boolean;
  children?: IOptionProps[];
}

export interface IDropdownProps {
  title?: ReactNode;
  options: IOptionProps[];
  buttonProps?: ButtonProps;
  onClickOption: (key: string) => void;
  Component?: ElementType;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

export const renderMenu = (
  options: IOptionProps[],
  open: boolean,
  onClickOption: IDropdownProps['onClickOption'],
) => {
  return options?.map((option) => {
    return option.children ? (
      <NestedItem
        key={option.key}
        label={option.label}
        disabled={option.disabled}
        parentMenuOpen={open}
      >
        {renderMenu(option.children, open, onClickOption)}
      </NestedItem>
    ) : (
      <DropdownItem key={option.key} option={option} onClickOption={onClickOption} />
    );
  });
};

export const Dropdown = ({
  onClickOption,
  buttonProps,
  title,
  options,
  Component,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  transformOrigin = { vertical: 'top', horizontal: 'center' },
}: IDropdownProps) => {
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleItemClick = useCallback(
    (key) => {
      if (onClickOption instanceof Function) {
        onClickOption(key);
      }
      setOpen(false);
    },
    [onClickOption],
  );
  return (
    <div>
      {Component ? (
        <Component anchorEl={anchorRef} onClick={handleOpen} />
      ) : (
        <Button ref={anchorRef} onClick={handleOpen} {...buttonProps}>
          {title}
        </Button>
      )}

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        style={{ marginTop: '4px' }}
      >
        {renderMenu(options, open, handleItemClick)}
      </Menu>
    </div>
  );
};
