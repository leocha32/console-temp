import {
  TableRow,
  TableCell,
  TableBody as MuiTableBody,
  TableCellProps,
} from '@mui/material';
import React, { ReactNode } from 'react';

export interface IColumn<T> extends TableCellProps {
  id: string;
  label: string;
  minWidth?: number;
  columns?: IColumn<T>[];
  cell?:
    | string
    | ((
        value: T,
        data: T[],
      ) =>
        | (TableCellProps & { render: ReactNode }[])
        | (TableCellProps & { render: ReactNode }));
}
export interface ITableBodyProps<T> {
  columns: IColumn<T>[];
  data: T[];
  rowHeader?: IColumn<T>[];
}

const makeCell = (column, row, data) => {
  const { cell, id } = column;
  const tableCell = cell && cell(row, data);
  return Array.isArray(tableCell) ? (
    tableCell?.map(({ render, ...props }, cellIndex) => (
      <TableCell key={`${id}-${cellIndex}`} {...props}>
        {render}
      </TableCell>
    ))
  ) : row[id] ? (
    <TableCell key={id} {...tableCell}>
      {tableCell ? tableCell.render : row[id]}
    </TableCell>
  ) : null;
};

export const TableBody = <T extends object>({
  data,
  columns,
  rowHeader,
}: ITableBodyProps<T>) => {
  return (
    <MuiTableBody>
      {rowHeader
        ? rowHeader.map(({ label, id, ...props }) => (
            <TableRow key={id}>
              <>
                <TableCell {...props}>{label}</TableCell>
                {data.map((row, index) => (
                  <TableCell key={index}>{row[id]}</TableCell>
                ))}
              </>
            </TableRow>
          ))
        : data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                const { columns: childColumns } = column;
                if (childColumns) {
                  return childColumns?.map((column) => makeCell(column, row, data));
                } else {
                  return makeCell(column, row, data);
                }
              })}
            </TableRow>
          ))}
    </MuiTableBody>
  );
};
