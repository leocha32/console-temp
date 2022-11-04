import * as React from 'react';
import {
  TableBody as MuiTableBody,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
} from '@mui/material';
import { TableRow, TRowProps, TColumnProps } from './TableRow';
import { TableHeader, IColumn } from './TableHeader';
import { EmptyContent } from '../Templates/EmptyContent';
export interface ITableContainerProps extends MuiTableContainerProps {
  headers?: IColumn[];
  row: TRowProps[];
  columns: TColumnProps[];
  showHeader?: boolean;
  emptyHeight?: string;
}

export const Table = ({
  columns,
  headers = [],
  row,
  showHeader = true,
  sx,
  emptyHeight = 'auto',
  ...props
}: ITableContainerProps) => {
  return (
    <MuiTableContainer
      sx={{
        alignSelf: 'center',
        ...sx,
      }}
      {...props}
    >
      {row.length === 0 ? (
        <div style={{ height: `${emptyHeight}` }}>
          <EmptyContent></EmptyContent>
        </div>
      ) : null}
      <MuiTable>
        {showHeader ? <TableHeader headers={headers}></TableHeader> : null}
        <MuiTableBody>
          {row.map((row, i) => (
            <TableRow key={i} columns={columns} rowData={row}></TableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};
