import {
  TableRow,
  TableCell,
  TableFooter as MuiTableFooter,
  TableCellProps,
} from '@mui/material';
import { ReactNode } from 'react';

export interface ITableFooterProps<T> {
  columns: ({
    render: string | ((data: T[]) => ReactNode);
  } & TableCellProps)[];
  data: T[];
}

export const TableFooter = <T extends object>({
  columns,
  data,
}: ITableFooterProps<T>) => {
  return (
    <MuiTableFooter>
      <TableRow>
        {columns.map(({ render, ...props }, index) => {
          return (
            <TableCell key={index} {...props}>
              {typeof render === 'string' ? render : render(data)}
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableFooter>
  );
};
