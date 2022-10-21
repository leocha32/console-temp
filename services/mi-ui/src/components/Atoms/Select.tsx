import React, { useState } from 'react';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { css } from '@emotion/react';

export interface ISelectProps extends MuiSelectProps {
  options: TSelectOption[];
  value?: string;
  minWidth?: number;
  maxWidth?: number;
  onChange: (event: any, child: React.ReactNode) => void;
}

export type TSelectOption = {
  key: string;
  value: string;
};

export const Select = ({
  options,
  minWidth = 100,
  maxWidth = 100,
  value = '',
  onChange,
  ...props
}: ISelectProps) => {
  const [selectValue, setSelectValue] = useState<string[]>([value]);

  const changeMultipleValue = ({ target: { value } }: any) => {
    setSelectValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <MuiSelect
      {...props}
      css={css`
        min-width: ${minWidth}px;
        max-width: ${maxWidth}px;
      `}
      value={selectValue}
      onChange={(e, node) => {
        changeMultipleValue(e);
        onChange(e, node);
      }}
    >
      {options.map(({ key, value }: TSelectOption) => (
        <MuiMenuItem key={key} value={value}>
          {value}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  );
};
