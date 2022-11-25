import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { TableRow as MuiTableRow } from '@mui/material';
import { Cell } from '../Atoms';
const RenderRowCell = ({ rowData, columns, }) => {
    const { name, data, label, options: rowOptions } = rowData;
    return data.map((data, i) => {
        var _a;
        const colOptions = (_a = columns.find(({ name }) => name === data.colName)) === null || _a === void 0 ? void 0 : _a.options;
        const sumOptions = Object.assign(Object.assign({}, rowOptions), (name === 'label' ? {} : colOptions));
        return (_jsx(Cell, { options: sumOptions, colSpan: data.colSpan, name: data.colName, value: data.value }, name + i));
    });
};
export const TableRow = ({ columns, rowData }) => {
    var _a;
    const { name: rowName, data, label, options: rowOptions } = rowData;
    const rowSpan = (rowOptions === null || rowOptions === void 0 ? void 0 : rowOptions.rowSpan) || 0;
    const colOptions = Object.assign({ sx: rowOptions === null || rowOptions === void 0 ? void 0 : rowOptions.sx }, (_a = columns.find(({ name }) => 'rowHeader' === name)) === null || _a === void 0 ? void 0 : _a.options);
    /**
     * todo column option 추가
     */
    return (_jsx(_Fragment, { children: rowSpan > 1 ? (_jsx(_Fragment, { children: data === null || data === void 0 ? void 0 : data.map((row, i) => (_jsxs(_Fragment, { children: [i === 0 ? (_jsx(Cell, { options: Object.assign({}, colOptions), rowSpan: rowSpan + 1, name: 'rowHeader', value: label || '' })) : null, _jsx(MuiTableRow, { children: row.map(({ colName, value }, j) => {
                            var _a;
                            const colOptions = (_a = columns.find(({ name }) => name === colName)) === null || _a === void 0 ? void 0 : _a.options;
                            const sumOptions = Object.assign(Object.assign({}, rowOptions), (rowName === 'label' ? {} : colOptions));
                            return (_jsx(Cell, { rowSpan: 1, options: sumOptions, name: colName, value: value }, j));
                        }) }, i)] }))) })) : (_jsxs(MuiTableRow, Object.assign({ sx: { height: '40px' } }, { children: [label && (_jsx(Cell, { options: Object.assign({}, colOptions), rowSpan: rowSpan, colSpan: (rowOptions === null || rowOptions === void 0 ? void 0 : rowOptions.colSpan) || 1, name: 'rowHeader', value: label || '' })), RenderRowCell({ rowData, columns })] }))) }));
};
