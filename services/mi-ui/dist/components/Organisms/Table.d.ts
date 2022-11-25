import { TableContainerProps as MuiTableContainerProps } from '@mui/material';
import { TRowProps, TColumnProps } from './TableRow';
import { IColumn } from './TableHeader';
import { TSummaryRow } from './TableSummaryRow';
export interface ITableContainerProps extends MuiTableContainerProps {
    headers?: IColumn[];
    rows: TRowProps[];
    columns: TColumnProps[];
    showHeader?: boolean;
    summary?: TSummaryRow;
    emptyHeight?: string;
}
export declare const Table: ({ columns, headers, rows, showHeader, summary, sx, ...props }: ITableContainerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Table.d.ts.map