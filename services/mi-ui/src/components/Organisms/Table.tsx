import * as React from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
  Table as MuiTable,
  TableProps as MuiTableProps,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
  TablePagination as MuiTablePagination,
  TablePaginationProps as MuiTablePaginationProps,
  Paper as MuiPaper,
} from '@mui/material';
import { css } from '@emotion/react';
import { TableRow } from './TableRow';
import { Cell } from '../Atoms';

/**
 * @rows Row 데이터 {Object Array}
 * @headers Header 데이터 {@link IHeaderData}
 */
export interface ITableContainerProps extends MuiTableContainerProps {
  headers: IHeaderData[];
  columns: TColumnConfig[];
  rowData: object[];
}

/**
 * @Header
 */
export interface IHeaderData extends MuiTableHeadProps {
  label: string;
  value: string;
  css?: string;
  columnType?: string;
}

export type TColumnConfig = {
  name: string;
  renderOptions?: {
    renderer: string;
    options?: {
      key: string;
      value: string;
    }[];
  };
};

export const Table = ({ columns, headers, rowData, ...props }: ITableContainerProps) => {
  /**
   * todo : Row / Column Span
   * todo : Row / Column Span
   */
  return (
    <MuiTableContainer {...props} component={MuiPaper}>
      <MuiTable>
        <MuiTableHead>
          headers.map()
          <MuiTableRow>
            {headers.map(({ label, value }) => (
              <MuiTableCell key={value}>{label}</MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>

        <MuiTableBody>
          {rowData.map((data, i) => {
            const checkChildren = data['children'] || [];
            const rowKeys = Object.keys(data);

            return (
              <>
                <TableRow row={data}></TableRow>

                {checkChildren?.map((children, j) => {
                  return (
                    <MuiTableRow key={j}>
                      {rowKeys.map((key, k) => (
                        <Cell key={j + '' + k} value={children[key]}></Cell>
                      ))}
                    </MuiTableRow>
                  );
                })}
              </>
            );
          })}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};
