import * as React from 'react';
import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from '@mui/material';
import { Cell, TCellRenderOptions } from '../Atoms';

export interface ITableRowProps extends MuiTableRowProps {
  rowData: TRowData;
  columns: TCellRenderOptions[];
}

export type TRowData = {
  [key: string]: string | number | any;
};

export const TableRow = ({ tabIndex, columns, rowData, ...props }: ITableRowProps) => {
  const keys = Object.keys(rowData);

  return (
    <MuiTableRow key={tabIndex} {...props}>
      {keys.map((key, i) => {
        const renderOptions = columns.find(({ name }) => name === key);

        return (
          <Cell
            key={tabIndex + '' + i}
            name={key}
            renderOptions={renderOptions}
            value={rowData[key]}
          ></Cell>
        );
      })}
    </MuiTableRow>
  );
};
