import React, { useCallback } from 'react';
import { MenuItem, MenuItemProps } from '@mui/material';
import { IOptionProps } from './Dropdown';

export interface IDropdownItemListProps extends MenuItemProps {
  option: IOptionProps;
  onClickOption?: (key: string) => void;
}
export const DropdownItem = ({
  option,
  onClickOption,
  ...props
}: IDropdownItemListProps) => {
  const handleClickItem = useCallback(
    (key) => {
      if (onClickOption instanceof Function) {
        onClickOption(key);
      }
    },
    [onClickOption],
  );
  return (
    <MenuItem
      {...props}
      key={option.key}
      onClick={() => handleClickItem(option.key)}
      disabled={option.disabled}
    >
      {option.label}
    </MenuItem>
  );
};
