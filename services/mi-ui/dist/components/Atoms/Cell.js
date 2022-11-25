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
import { TableCell as MuiTableCell, } from '@mui/material';
import styled from '@emotion/styled';
const TableCell = styled(MuiTableCell) `
  line-height: normal;
  padding: 10px 15px;
  height: 20px;
`;
const defaultCellOption = {
    rowSpan: 1,
    colSpan: 1,
    textFormat: (value) => String(value),
    colorFormat: (value) => String(value),
    height: 'inherit',
    fontSize: 15,
};
export const Cell = (_a) => {
    var { value, rowSpan, colSpan, options } = _a, props = __rest(_a, ["value", "rowSpan", "colSpan", "options"]);
    const { sx, textFormat, colorFormat } = Object.assign(Object.assign({}, defaultCellOption), options);
    const defaultSx = {
        textAlign: 'center',
    };
    return (_jsx(TableCell, Object.assign({ colSpan: colSpan, rowSpan: rowSpan ? rowSpan : 1, sx: Object.assign(Object.assign(Object.assign({}, defaultSx), sx), { color: colorFormat ? colorFormat(value) : 'black' }) }, props, { children: typeof value === 'object' ? value : textFormat ? textFormat(value) : value })));
};
