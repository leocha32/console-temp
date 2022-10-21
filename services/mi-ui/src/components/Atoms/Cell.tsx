import React, { useState } from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';
import { css } from '@emotion/react';
import { Select } from './Select';

export interface ICellProps extends MuiTableCellProps {
  readonly?: boolean;
  renderer?: string;
  align?: Align;
  value: string;
}

enum Align {
  Center = 'center',
  Right = 'right',
  Left = 'left',
}

const SelectRenderer = (rendererName, { options, onChange, value }) => {
  switch (rendererName) {
    case 'select':
      return <Select options={options} onChange={onChange}></Select>;
    default:
      return <input />;
  }
};

const CellSelector = () => {
  return (
    <Select
      options={[{ key: 'aa', value: '1' }]}
      onChange={() => {
        console.log('dd');
      }}
    ></Select>
  );
};

export const Cell = ({
  value,
  onChange,
  renderer,
  readonly = false,
  ...props
}: ICellProps) => {
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
        <input
          css={css`
            border: none;
            font-family: 'Noto Sans KR';
            font-size: 1rem;
          `}
          onChange={(e) => {
            console.log('input', e.target.value);
            changeMultipleValue(e);
          }}
          value={inputValue}
        />
      )}
    </MuiTableCell>
  );
};
