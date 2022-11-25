import React from 'react';
import { TableCellProps as MuiTableCellProps } from '@mui/material';
export interface ICellProps {
    name: string;
    value: string | number;
    rowSpan?: number;
    colSpan?: number;
    options?: ICellOptions;
    icon?: React.ReactElement;
}
export interface ICellOptions extends MuiTableCellProps {
    rowSpan?: number;
    textFormat?: (value: string | number) => string;
    colorFormat?: (value: string | number) => string;
    height?: number | string;
    fontSize?: number;
}
export declare const Cell: ({ value, rowSpan, colSpan, options, ...props }: ICellProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Cell.d.ts.map