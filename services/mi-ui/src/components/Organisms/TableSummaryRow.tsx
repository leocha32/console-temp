import { TableRow as MuiTableRow } from '@mui/material';
import { Cell, ICellOptions } from '../Atoms/Cell';
import { TRowProps, TColumnProps } from './TableRow';

export type TTableSummaryRowProps = {
  summary: TSummaryRow;
  rows: TRowProps[];
  columns: TColumnProps[];
};

export type TSummaryRow = {
  label: string;
  options?: ICellOptions;
  summaryInfo: ISummaryInfo[];
};

interface ISummaryInfo {
  colName: string;
  value: string | number;
  options: ICellOptions;
}

export const TableSummaryRow = ({ summary, rows, columns }: TTableSummaryRowProps) => {
  if (!summary && rows[0]?.data?.length === 0) return null;

  const rowDataLength = rows[0]?.data.length;
  const findByColumn = columns.find((col) => col.name === summary.summaryInfo[0].colName);
  const findByRow = rowDataLength - summary.summaryInfo.length;

  const colSpan = findByColumn ? columns.indexOf(findByColumn) : findByRow;
  const { summaryInfo } = summary;

  return (
    <MuiTableRow>
      <Cell
        colSpan={colSpan}
        options={summary.options}
        name={summary.label}
        value={summary.label}
      ></Cell>
      {summaryInfo.map(({ value, options }, i) => (
        <Cell {...options} key={i} name={String(value)} value={value}></Cell>
      ))}
    </MuiTableRow>
  );
};
