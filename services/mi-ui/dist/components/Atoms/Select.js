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
import { useState, useCallback, useMemo } from 'react';
import { Select as MuiSelect, MenuItem as MuiMenuItem, IconButton, Checkbox, ListItemText, TextField, ListSubheader, InputAdornment, OutlinedInput, FormControlLabel as MuiFormControlLabel, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;
const SubHeader = styled(ListSubheader) `
  padding: 0;
  color: ${({ theme }) => theme.palettes.gray.GRAY_1000};
`;
const SearchInput = styled(TextField) `
  padding: 0 10px;
  width: calc(100% - 20px);
  height: ;
`;
const CSelect = styled(MuiSelect) `
  min-width: 200px;
  height: 40px;
  background: #fff;
`;
const MenuItem = styled(MuiMenuItem) `
  height: ${ITEM_HEIGHT}px;
  min-height: ${ITEM_HEIGHT}px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_1000};
  padding: 6px 10px;
  font-size: 12px;
  &.select : {
    background-color: red;
  }
`;
const FormControlLabel = styled(MuiFormControlLabel) `
  padding: 0 10px;
  color: #191f28;
`;
const SearchWrap = styled.div `
  position: relative;
`;
const clearButtonStyle = css `
  position: absolute;
  right: 14px;
  top: 5px;
`;
export const Select = (_a) => {
    var { multiple = false, title = '', displayEmpty = true, onChange, options, value: values, useSearch = false, useAllCheck = multiple, defaultLabel = '선택하세요.' } = _a, props = __rest(_a, ["multiple", "title", "displayEmpty", "onChange", "options", "value", "useSearch", "useAllCheck", "defaultLabel"]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const displayedOptions = useMemo(() => options.filter(({ label }) => label.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1), [searchKeyword, options]);
    const handleAllCheck = useCallback(({ target: { checked } }) => {
        const newValue = checked ? options.map(({ value }) => value) : [];
        onChange(newValue);
    }, [onChange, options]);
    const handleChange = useCallback(({ target: { value } }) => {
        onChange(value);
    }, [onChange]);
    const handleSearchKeywordChange = useCallback(({ target: { value } }) => {
        setSearchKeyword(value);
    }, []);
    const handleDeleteSearchKeyword = useCallback(() => {
        setSearchKeyword('');
    }, []);
    return (_jsxs(CSelect, Object.assign({ multiple: multiple, displayEmpty: displayEmpty, value: values, input: _jsx(OutlinedInput, {}), onChange: handleChange, renderValue: (selected) => {
            var _a;
            if (multiple) {
                const text = (selected === null || selected === void 0 ? void 0 : selected.length) === (options === null || options === void 0 ? void 0 : options.length)
                    ? '전체'
                    : `${selected === null || selected === void 0 ? void 0 : selected.length} 선택됨`;
                if (title) {
                    return selected.length ? `${title}: ${text}` : `${title}`;
                }
                else
                    return selected.length ? `${text}` : defaultLabel;
            }
            else {
                const selectedLabel = (_a = displayedOptions === null || displayedOptions === void 0 ? void 0 : displayedOptions.find(({ value }) => value === selected)) === null || _a === void 0 ? void 0 : _a.label;
                if (title) {
                    return selectedLabel ? `${title}: ${selectedLabel}` : `${title}`;
                }
                else
                    return selectedLabel ? `${selectedLabel}` : defaultLabel;
            }
        }, MenuProps: {
            autoFocus: false,
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
                },
            },
        } }, props, { children: [_jsxs(SubHeader, { children: [useSearch ? (_jsxs(SearchWrap, { children: [_jsx(SearchInput, { size: "small", autoFocus: true, placeholder: "Search...", fullWidth: true, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(SearchIcon, {}) }))),
                                }, value: searchKeyword, onChange: handleSearchKeywordChange, onKeyDown: (e) => {
                                    if (e.key !== 'Escape') {
                                        e.stopPropagation();
                                    }
                                } }), searchKeyword && (_jsx(IconButton, Object.assign({ onClick: handleDeleteSearchKeyword, css: clearButtonStyle, size: 'small' }, { children: _jsx(ClearIcon, { sx: { width: '20px', height: '20px' } }) })))] })) : null, multiple && useAllCheck && !searchKeyword ? (_jsx(MenuItem, Object.assign({ value: 'all' }, { children: _jsx(FormControlLabel, { label: "\uC804\uCCB4", control: _jsx(Checkbox, { checked: Array.isArray(values) && (values === null || values === void 0 ? void 0 : values.length) === options.length, onChange: handleAllCheck }) }) }))) : null] }), displayedOptions === null || displayedOptions === void 0 ? void 0 : displayedOptions.map(({ value, label }, index) => (_jsxs(MenuItem, Object.assign({ value: value }, { children: [multiple ? (_jsx(Checkbox, { checked: Array.isArray(values) && (values === null || values === void 0 ? void 0 : values.includes(value)) })) : null, _jsx(ListItemText, Object.assign({ title: label === null || label === void 0 ? void 0 : label.toString() }, { children: label }))] }), index)))] })));
};
