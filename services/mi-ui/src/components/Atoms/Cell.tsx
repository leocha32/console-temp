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
  const { readonly, renderer } = { ...TCellOptionsDefaultValue, ...renderOptions };
  const [inputValue, setInputValue] = useState<string>(value);

  const changeMultipleValue = ({ target: { value } }: any) => {
    console.log(value);
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
          renderOptions={renderOptions}
          onChange={changeMultipleValue}
          value={inputValue}
        ></RenderInputByType>
      )}
    </MuiTableCell>
  );
};

const Input = ({ ...props }) => {
  return <MuiInput {...fontStyle('default')} {...props}></MuiInput>;
};

const RenderInputByType = (renderOptions, { options, onChange, ...props }) => {
  switch (renderOptions.renderer) {
    case 'select':
      return <Select options={options} onChange={onChange}></Select>;
    case 'number':
      return <Input type="number">value</Input>;
    default:
      return <Input>value</Input>;
  }
};

const fontStyle = (info) => {
  return css`
    color: ${FontColor[info]};
    border: none;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
  `;
};

const FontColor = {
  default: 'black',
  warning: 'darkorange',
  danger: 'lightcoral',
};
