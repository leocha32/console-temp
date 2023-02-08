import { TableRow, TableHead, TableCell } from '@mui/material';
import { ITableBodyProps } from './TableBody';

export interface ITableHeaderProps<T> {
  columns: ITableBodyProps<T>['columns'];
}

const makeRow = (columns) => (
  <TableRow>
    {columns.map((column) => {
      return (
        <TableCell
          align={column?.columns?.length || column?.colSpan ? 'center' : 'left'}
          colSpan={column?.columns?.length || column?.colSpan}
          rowSpan={column?.rowSpan}
          key={column.id}
        >
          {column.label}
        </TableCell>
      );
    })}
  </TableRow>
);

export const TableHeader = <T extends object>({ columns }: ITableHeaderProps<T>) => {
  const childColumn = columns?.flatMap((c) => c.columns).filter((column) => column);
  return (
    <TableHead>
      {makeRow(columns)}
      {childColumn?.length ? makeRow(childColumn) : null}
    </TableHead>
  );
};
