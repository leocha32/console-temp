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
import { useCallback } from 'react';
import { RadioGroup as MuiRadioGroup, Radio as MuiRadio, FormControlLabel as MuiFormControlLabel, FormLabel as MuiFormLabel, FormControl, } from '@mui/material';
export var FlexDirection;
(function (FlexDirection) {
    FlexDirection["COLUMN"] = "column";
    FlexDirection["ROW"] = "row";
    FlexDirection["ROW_REVERSE"] = "row-reverse";
    FlexDirection["COLUMN_REVERSE"] = "column-reverse";
})(FlexDirection || (FlexDirection = {}));
export const RadioButton = (_a) => {
    var { options, flexDirection = FlexDirection.ROW, onChange, label } = _a, props = __rest(_a, ["options", "flexDirection", "onChange", "label"]);
    const handleChange = useCallback((event, value) => {
        if (onChange instanceof Function) {
            onChange(event, value);
        }
    }, [onChange]);
    return (_jsxs(FormControl, { children: [_jsx(MuiFormLabel, Object.assign({ sx: { color: 'black' } }, { children: label })), _jsx(MuiRadioGroup, Object.assign({}, props, { row: flexDirection === 'row', 
                // sx={{ border: 'solid 1px lightgray', borderRadius: '4px' }}
                defaultValue: options ? options[0] : '', name: "radio-buttons-group", onChange: handleChange }, { children: options.map((value) => (_jsx(MuiFormControlLabel, { value: value, control: _jsx(MuiRadio, {}), label: value }, value))) }))] }));
};
