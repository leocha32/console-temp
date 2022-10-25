import * as React from 'react';
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
  TableBody as MuiTableBody,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
  Paper as MuiPaper,
} from '@mui/material';

import { TableRow, TRowData } from './TableRow';
import { Cell, TCellRenderOptions } from '../Atoms';
import { textAlign } from '@mui/system';
/**
 * @rows Row 데이터 {Object Array}
 * @headers Header 데이터 {@link IHeaderData}
 */
export interface ITableContainerProps extends MuiTableContainerProps {
  headers: IHeaderData[];
  rowData: TRowData[];
  columns: TCellRenderOptions[];
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
type THeaderType = {
  label: string;
  value: string;
  subValues?: Array<THeaderType>;
  child?: Array<THeaderType>;
};

type THeaderInterface = Array<THeaderType>;

const renderHeader = (data: THeaderType) => {
  if (!data['child']) {
    const colSpan = data.subValues?.length || 1;
    return (
      <MuiTableRow>
        <MuiTableCell align={'center'} key={data.value}>
          {data.label}
        </MuiTableCell>
      </MuiTableRow>
    );
  }
  const colSpan = data.child?.length + 1 || 1;
  return (
    <>
      <MuiTableCell rowSpan={2} align={'center'} key={data.value}>
        {data.label}
      </MuiTableCell>
      {data.child.map((value) => renderHeader(value))}
      {data?.subValues?.map((value) => (
        <MuiTableCell key={value.value}>{value.label}</MuiTableCell>
      ))}
    </>
  );
};

export const Table = ({
  columns = [],
  headers = [],
  rowData,
  ...props
}: ITableContainerProps) => {
  /**
   * todo : Row / Column Span
   */
  return (
    <MuiTableContainer {...props} component={MuiPaper}>
      <MuiTable>
        <MuiTableHead>
          <MuiTableRow>
            {headers?.map(({ label, value }, i) => (
              <MuiTableCell
                sx={{
                  textAlign: 'center',
                }}
                key={value + i}
                colSpan={value === 'division' ? 2 : 1}
              >
                {label}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>

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
