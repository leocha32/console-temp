import { ReactNode } from 'react';
import { ICellOptions } from '../Atoms';
export interface ITableRowProps {
    rowData: TRowProps;
    columns: TColumnProps[];
}
export declare type TColumnProps = {
    name: string;
    label?: string;
    options?: ICellOptions;
};
export declare type TRowProps = {
    name: string;
    data: TRowData[] | TRowData[][];
    label?: string;
    options?: ICellOptions;
    detail?: string[] | number[];
};
export declare type TRowData = {
    colName: string;
    value: ReactNode | TRowData[];
};
export declare const TableRow: ({ columns, rowData }: ITableRowProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TableRow.d.ts.map