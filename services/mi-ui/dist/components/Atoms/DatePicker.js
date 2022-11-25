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
import { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker, LocalizationProvider, } from '@mui/x-date-pickers';
import { css } from '@emotion/react';
/* views = ['year'] || ['year','month'] || ['year','month',day'](default)*/
export const DatePicker = (_a) => {
    var { inputFormat = 'YYYY.MM.DD', onChange } = _a, props = __rest(_a, ["inputFormat", "onChange"]);
    const handleChange = useCallback((value) => {
        onChange(value);
    }, [onChange]);
    return (_jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs }, { children: _jsx(MuiDatePicker, Object.assign({ css: css `
          background: #fff;
          height: 40px;
          min-width: 200px;
        `, inputFormat: inputFormat, PaperProps: {
                style: {
                    marginTop: '4px',
                },
            }, PopperProps: {
                placement: 'bottom-start',
            } }, props, { onChange: handleChange, renderInput: (params) => _jsx(TextField, Object.assign({ size: "small" }, params)) })) })));
};
