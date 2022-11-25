import { TableHeadProps as MuiTableHeadProps, TableCellProps } from '@mui/material';
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
export declare const TableHeader: ({ headers, ...props }: ITableHeaderProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TableHeader.d.ts.map