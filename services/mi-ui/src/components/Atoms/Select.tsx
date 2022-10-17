import React from 'react';
import { Select as MuiSelect, SelectProps as MuiSelectProps, MenuItem as MuiMenuItem } from '@mui/material';

export interface ISelectProps extends MuiSelectProps {
  options: string[];
}

export const Select = (props: ISelectProps) => {
  const [selectValue, setSelectValue] = React.useState<string[]>([]);
  const { options } = props;

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <MuiSelect {...props} value={selectValue} onChange={handleChange}>
      {options.map((option) => (
        <MuiMenuItem key={option} value={option}>
          {option}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  );
};
