import React, { useState } from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  Input as MuiInput,
} from '@mui/material';
import { css } from '@emotion/react';
import { Select } from './Select';

export interface ICellProps extends MuiTableCellProps {
  name: string;
  value: string;
  renderOptions?: TCellOptions;
}

export type TCellOptions = {
  name: string;
  readonly?: boolean;
  renderer?: string;
  options?: {
    key: string;
    value: string;
  }[];
};

const TCellOptionsDefaultValue: TCellOptions = {
  name: '',
  readonly: true,
  renderer: 'text',
  options: [
    {
      key: '',
      value: '',
    },
  ],
};

export const Cell = ({ value, onChange, renderOptions, ...props }: ICellProps) => {
  const { readonly } = { ...TCellOptionsDefaultValue, ...renderOptions };
  const [inputValue, setInputValue] = useState<string>(value);

  const changeMultipleValue = ({ target: { value } }: any) => {
    setInputValue(value);
  };

  //todo : Renderer 조건 별 동작 수정
  return (
    <MuiTableCell {...props}>
      {readonly ? (
        value
      ) : (
        <RenderInputByType
          {...props}
          onChange={changeMultipleValue}
          value={inputValue}
        ></RenderInputByType>
      )}
    </MuiTableCell>
  );
};

const Input = ({ ...props }) => {
  return (
    <MuiInput
      css={css`
        border: none;
        font-family: 'Noto Sans KR';
        font-size: 1rem;
      `}
      {...props}
    ></MuiInput>
  );
};

const RenderInputByType = (rendererName, { options, onChange, value }) => {
  switch (rendererName) {
    case 'select':
      return <Select options={options} onChange={onChange}></Select>;
    case 'number':
      return <Input type="number">value</Input>;
    default:
      return <Input>value</Input>;
  }
};
