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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { TableRow as MuiTableRow, TableHead as MuiTableHead, TableCell as MuiTableCell, } from '@mui/material';
import styled from '@emotion/styled';
const Header = styled(MuiTableHead) `
  height: 40px;
  position: sticky;
  top: 0;
`;
const Cell = styled(MuiTableCell) `
  line-height: normal;
  padding: 0;
  text-align: center;
`;
const getDepth = (columns) => {
    if (columns == null) {
        return 0;
    }
    let depth = 0;
    columns.forEach((item) => {
        depth = Math.max(depth, getDepth(item.columns));
    });
    return depth + 1;
};
const getColSpan = (column) => {
    if (column.columns == null) {
        return 1;
    }
    let width = 0;
    column.columns.forEach((child) => {
        width += getColSpan(child);
    });
    return width;
};
const getHeaders = (columns) => {
    const maxDepth = getDepth(columns);
    const result = Array.from({
        length: maxDepth,
    }).map(() => []);
    const addItems = (columns, depth) => {
        columns.forEach((column) => {
            const columnDef = Object.assign({}, column);
            delete columnDef.columns;
            if (column.columns) {
                const colSpan = getColSpan(column);
                if (colSpan > 1) {
                    columnDef.colSpan = colSpan;
                }
                addItems(column.columns, depth + 1);
            }
            else {
                const rowSpan = maxDepth - depth;
                if (rowSpan > 1) {
                    columnDef.rowSpan = maxDepth - depth;
                }
            }
            result[depth].push(columnDef);
        });
    };
    addItems(columns, 0);
    return result;
};
export const TableHeader = (_a) => {
    var { headers } = _a, props = __rest(_a, ["headers"]);
    return (_jsx(Header, Object.assign({}, props, { children: getHeaders(headers).map((headerRow, headerRowIndex) => (_jsx(MuiTableRow, Object.assign({ className: 'MuiTableRow-head' }, { children: headerRow &&
                headerRow.map(({ name, colSpan = 1, rowSpan = 1, colSpanOffset = 0, sx }) => {
                    return (_jsx(Cell, Object.assign({ sx: sx, colSpan: colSpan + colSpanOffset, rowSpan: rowSpan }, { children: name }), `header-cell-${name}`));
                }) }), `header-row-${headerRowIndex}`))) })));
};
