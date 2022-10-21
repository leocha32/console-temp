import * as React from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from '@mui/material';
import { css } from '@emotion/react';
import { Cell, ICellProps } from '../Atoms';

export interface ITableRowProps extends MuiTableRowProps {
  row: object;
}

export const TableRow = ({ row, ...props }: ITableRowProps) => {
  const keys = Object.keys(row);

  return (
    <MuiTableRow {...props}>
      {keys.map((key, i) => (
        <Cell key={i} value={row[key]}></Cell>
      ))}
    </MuiTableRow>
  );
};
