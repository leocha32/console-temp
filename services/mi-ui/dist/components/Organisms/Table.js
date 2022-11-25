var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { TableBody as MuiTableBody, Box, Table as MuiTable, TableContainer as MuiTableContainer, } from '@mui/material';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { TableSummaryRow } from './TableSummaryRow';
import { EmptyContent } from '../Templates/EmptyContent';
export const Table = (_a) => {
    var { columns, headers = [], rows, showHeader = true, summary, sx } = _a, props = __rest(_a, ["columns", "headers", "rows", "showHeader", "summary", "sx"]);
    return rows.length === 0 ? (_jsx(Box, Object.assign({ sx: Object.assign({ width: '100%', height: '100%' }, sx) }, { children: _jsx(EmptyContent, {}) }))) : (_jsx(MuiTableContainer, Object.assign({ sx: Object.assign({ height: '100%', alignSelf: 'center' }, sx) }, props, { children: _jsxs(MuiTable, { children: [showHeader ? _jsx(TableHeader, { headers: headers }) : null, _jsxs(MuiTableBody, { children: [rows.map((row, i) => (_jsx(TableRow, { columns: columns, rowData: row }, i))), summary ? (_jsx(TableSummaryRow, { summary: summary, rows: rows, columns: columns })) : null] })] }) })));
};
