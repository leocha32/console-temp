import React from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';

export interface ICellProps {
  name: string;
  value: string | number;
  rowSpan?: number;
  options?: ICellOptions;
  icon?: React.ReactElement;
}

export interface ICellOptions extends MuiTableCellProps {
  rowSpan?: number;
  textFormat?: (value: string | number) => string;
  colorFormat?: (value: string | number) => string;
}

export const Cell = ({
  value,
  rowSpan,
  options = { rowSpan: 0, sx: {} },
  ...props
}: ICellProps) => {
  const { sx, textFormat, colorFormat } = options;

  const defaultSx = {
    fontSize: 15,
    textAlign: 'center',
  } as MuiTableCellProps;

  return (
    <MuiTableCell
      rowSpan={rowSpan ? rowSpan : 1}
      sx={{
        color: colorFormat ? colorFormat(value) : 'black',
        ...defaultSx,
        ...sx,
        height: '1rem',
      }}
      {...props}
    >
      {textFormat ? textFormat(value) : value}
    </MuiTableCell>
  );
};
