import {
  TableBody as MuiTableBody,
  Box,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
} from '@mui/material';
import { TableRow, TRowProps, TColumnProps } from './TableRow';
import { TableHeader, IColumn } from './TableHeader';
import { TableSummaryRow, TSummaryRow } from './TableSummaryRow';
import { EmptyContent } from '../Templates/EmptyContent';
export interface ITableContainerProps extends MuiTableContainerProps {
  headers?: IColumn[];
  rows: TRowProps[];
  columns: TColumnProps[];
  showHeader?: boolean;
  summary?: TSummaryRow;
  emptyHeight?: string;
}

export const Table = ({
  columns,
  headers = [],
  rows,
  showHeader = true,
  summary,
  sx,
  ...props
}: ITableContainerProps) => {
  return rows.length === 0 ? (
    <Box sx={sx}>
      <EmptyContent></EmptyContent>
    </Box>
  ) : (
    <MuiTableContainer
      sx={{
        height: '100%',
        alignSelf: 'center',
        ...sx,
      }}
      {...props}
    >
      <MuiTable>
        {showHeader ? <TableHeader headers={headers}></TableHeader> : null}
        <MuiTableBody>
          {rows.map((row, i) => (
            <TableRow key={i} columns={columns} rowData={row}></TableRow>
          ))}
          {summary ? (
            <TableSummaryRow
              summary={summary}
              rows={rows}
              columns={columns}
            ></TableSummaryRow>
          ) : null}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};
