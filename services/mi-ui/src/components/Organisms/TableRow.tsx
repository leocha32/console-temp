import * as React from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from '@mui/material';
import { css } from '@emotion/react';
import { Cell, TCellOptions } from '../Atoms';

export interface ITableRowProps extends MuiTableRowProps {
  rowData: object;
  columns: TCellOptions[];
}

export const TableRow = ({ tabIndex, columns, rowData, ...props }: ITableRowProps) => {
  const keys = Object.keys(rowData);

  return (
    <MuiTableRow key={tabIndex} {...props}>
      {keys.map((key, i) => {
        const renderOptioin = columns.find(({ name }) => name === key);

        return (
          <Cell
            key={tabIndex + '' + i}
            name={key}
            renderOptions={renderOptioin}
            value={rowData[key]}
          ></Cell>
        );
      })}
    </MuiTableRow>
  );
};
