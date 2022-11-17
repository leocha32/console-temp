import React from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';
import styled from '@emotion/styled';

export interface ICellProps {
  name: string;
  value: string | number;
  rowSpan?: number;
  colSpan?: number;
  options?: ICellOptions;
  icon?: React.ReactElement;
}

export interface ICellOptions extends MuiTableCellProps {
  rowSpan?: number;
  textFormat?: (value: string | number) => string;
  colorFormat?: (value: string | number) => string;
  height?: number | string;
  fontSize?: number;
}
const TableCell = styled(MuiTableCell)`
  line-height: normal;
  padding: 10px 15px;
  height: 20px;
`;

const defaultCellOption: ICellOptions = {
  rowSpan: 1,
  colSpan: 1,
  textFormat: (value) => String(value),
  colorFormat: (value) => String(value),
  height: 'inherit',
  fontSize: 15,
};

export const Cell = ({ value, rowSpan, colSpan, options, ...props }: ICellProps) => {
  const { sx, textFormat, colorFormat } = {
    ...defaultCellOption,
    ...options,
  };

  const defaultSx = {
    textAlign: 'center',
  } as MuiTableCellProps;
  return (
    <TableCell
      colSpan={colSpan}
      rowSpan={rowSpan ? rowSpan : 1}
      sx={{
        ...defaultSx,
        ...sx,
        color: colorFormat ? colorFormat(value) : 'black',
      }}
      {...props}
    >
      {typeof value === 'object' ? value : textFormat ? textFormat(value) : value}
    </TableCell>
  );
};
