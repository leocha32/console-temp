import { ICellOptions } from '../Atoms/Cell';
import { TRowProps, TColumnProps } from './TableRow';
export declare type TTableSummaryRowProps = {
    summary: TSummaryRow;
    rows: TRowProps[];
    columns: TColumnProps[];
};
export declare type TSummaryRow = {
    label: string;
    options?: ICellOptions;
    summaryInfo: ISummaryInfo[];
};
interface ISummaryInfo {
    colName: string;
    value: string | number;
    options: ICellOptions;
}
export declare const TableSummaryRow: ({ summary, rows, columns }: TTableSummaryRowProps) => import("@emotion/react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=TableSummaryRow.d.ts.map