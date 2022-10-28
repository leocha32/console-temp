import * as React from 'react';
import {
  TableRow as MuiTableRow,
  TableBody as MuiTableBody,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
  Paper as MuiPaper,
} from '@mui/material';

import { TableRow, TRowData } from './TableRow';
import { Cell, TCellRenderOptions } from '../Atoms';
import { TableHeader, IColumn } from './TableHeader';

export interface ITableContainerProps extends MuiTableContainerProps {
  headers: IColumn[];
  rowData: TRowData[];
  columns: TCellRenderOptions[];
}

export const Table = ({
  columns = [],
  headers,
  rowData,
  ...props
}: ITableContainerProps) => {
  return (
    <MuiTableContainer {...props} component={MuiPaper}>
      <MuiTable>
        <TableHeader headers={headers}></TableHeader>
        <MuiTableBody>
          {rowData?.map((data, i) => {
            if (data['subValues']) {
              return (
                <>
                  <MuiTableRow>
                    <Cell
                      name={data.value + ''}
                      value={data.value}
                      rowSpan={data.subValues.length + 1 || 1}
                    ></Cell>
                  </MuiTableRow>

                  {data.subValues.map((value, i) => (
                    <TableRow
                      key={i + i}
                      tabIndex={i}
                      columns={columns}
                      rowData={value}
                    ></TableRow>
                  ))}
                </>
              );
            } else {
              return (
                <TableRow
                  key={i}
                  tabIndex={i}
                  columns={columns}
                  rowData={data}
                ></TableRow>
              );
            }
          })}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};
