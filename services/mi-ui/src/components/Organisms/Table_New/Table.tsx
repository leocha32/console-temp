import { TableContainer, Table as MuiTable } from '@mui/material';
import { TableHeader } from './TableHeader';
import { ITableFooterProps, TableFooter } from './TableFooter';
import { ITableBodyProps, TableBody } from './TableBody';

export interface ITableProps<T> extends ITableBodyProps<T> {
  footer?: ITableFooterProps<T>['columns'];
}
export const Table = <T extends object>({
  columns,
  data,
  rowHeader,
  footer,
}: ITableProps<T>) => {
  return (
    <TableContainer>
      <MuiTable stickyHeader>
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} rowHeader={rowHeader}></TableBody>
        {footer && <TableFooter columns={footer} data={data} />}
      </MuiTable>
    </TableContainer>
  );
};
