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
  fontWeight?: string | number;
}
const TableCell = styled(MuiTableCell)(
  {},
  ({ fontWeight }: { fontWeight?: string | number }) => ({
    lineHeight: 'nomal',
    padding: '10px 15px',
    height: '20px',
    fontWeight: fontWeight,
  }),
);

const defaultCellOption: ICellOptions = {
  rowSpan: 1,
  colSpan: 1,
  textFormat: (value) => String(value),
  colorFormat: (value) => String(value),
  height: 'inherit',
  fontSize: 15,
  fontWeight: 400,
};

export const Cell = ({ value, rowSpan, colSpan, options, ...props }: ICellProps) => {
  const { sx, textFormat, colorFormat, fontWeight } = {
    ...defaultCellOption,
    ...options,
  };

  const defaultSx = {
    textAlign: 'center',
  } as MuiTableCellProps;
  return (
    <TableCell
      fontWeight={fontWeight}
      colSpan={colSpan}
      rowSpan={rowSpan ? rowSpan : 1}
      sx={{
        ...defaultSx,
        ...sx,
        color: colorFormat ? colorFormat(value) : 'black',
      }}
      {...props}
    >
      {typeof value === 'object' ? value : textFormat ? textFormat(value || '') : value}
    </TableCell>
  );
};
