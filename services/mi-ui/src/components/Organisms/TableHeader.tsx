import * as React from 'react';
import {
  TableRow as MuiTableRow,
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
  TableCell as MuiTableCell,
  TableCellProps,
} from '@mui/material';

import styled from '@emotion/styled';

export interface ITableHeaderProps extends MuiTableHeadProps {
  headers: IColumn[];
}

export interface IColumn<TData = any> extends TableCellProps {
  name: string;
  key?: string;
  columns?: IColumn<TData>[];
  colSpan?: number;
  colSpanOffset?: number;
  rowSpan?: number;
}

const Header = styled(MuiTableHead)`
  height: 40px;
  position: sticky;
  top: 0;
`;
const Cell = styled(MuiTableCell)`
  line-height: normal;
  padding: 0;
  text-align: center;
`;
const getDepth = (columns: IColumn[] | undefined) => {
  if (columns == null) {
    return 0;
  }

  let depth = 0;
  columns.forEach((item) => {
    depth = Math.max(depth, getDepth(item.columns));
  });

  return depth + 1;
};

const getColSpan = (column: IColumn) => {
  if (column.columns == null) {
    return 1;
  }

  let width = 0;
  column.columns.forEach((child) => {
    width += getColSpan(child);
  });

  return width;
};

const getHeaders = (columns: IColumn[]) => {
  const maxDepth = getDepth(columns);
  const result: IColumn[][] = Array.from({
    length: maxDepth,
  }).map(() => []);

  const addItems = (columns: IColumn[], depth: number) => {
    columns.forEach((column) => {
      const columnDef: IColumn = {
        ...column,
      };
      delete columnDef.columns;

      if (column.columns) {
        const colSpan = getColSpan(column);
        if (colSpan > 1) {
          columnDef.colSpan = colSpan;
        }
        addItems(column.columns, depth + 1);
      } else {
        const rowSpan = maxDepth - depth;
        if (rowSpan > 1) {
          columnDef.rowSpan = maxDepth - depth;
        }
      }
      result[depth].push(columnDef);
    });
  };

  addItems(columns, 0);

  return result;
};

export const TableHeader = ({ headers, ...props }: ITableHeaderProps) => {
  return (
    <Header {...props}>
      {getHeaders(headers).map((headerRow, headerRowIndex) => (
        <MuiTableRow className={'MuiTableRow-head'} key={`header-row-${headerRowIndex}`}>
          {headerRow &&
            headerRow.map(({ name, colSpan = 1, rowSpan = 1, colSpanOffset = 0, sx }) => {
              return (
                <Cell
                  sx={sx}
                  key={`header-cell-${name}`}
                  colSpan={colSpan + colSpanOffset}
                  rowSpan={rowSpan}
                >
                  {name}
                </Cell>
              );
            })}
        </MuiTableRow>
      ))}
    </Header>
  );
};
