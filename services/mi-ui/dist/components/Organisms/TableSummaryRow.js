import { createElement as _createElement } from "@emotion/react";
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { TableRow as MuiTableRow } from '@mui/material';
import { Cell } from '../Atoms/Cell';
export const TableSummaryRow = ({ summary, rows, columns }) => {
    var _a, _b, _c;
    if (!summary && ((_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) === 0)
        return null;
    const rowDataLength = (_c = rows[0]) === null || _c === void 0 ? void 0 : _c.data.length;
    const findByColumn = columns.find((col) => col.name === summary.summaryInfo[0].colName);
    const findByRow = rowDataLength - summary.summaryInfo.length;
    const colSpan = findByColumn ? columns.indexOf(findByColumn) : findByRow;
    const { summaryInfo } = summary;
    return (_jsxs(MuiTableRow, { children: [_jsx(Cell, { colSpan: colSpan, options: summary.options, name: summary.label, value: summary.label }), summaryInfo.map(({ value, options }, i) => (_createElement(Cell, Object.assign({}, options, { key: i, name: String(value), value: value }))))] }));
};
