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
import { createElement as _createElement } from "@emotion/react";
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
import Select, { components, } from 'react-select';
const { MenuList, ValueContainer, SingleValue, Placeholder } = components;
const CustomMenuList = (_a) => {
    var { selectProps } = _a, props = __rest(_a, ["selectProps"]);
    const { onInputChange, inputValue, onFocus } = selectProps;
    return (_jsxs("div", { children: [_jsx("input", { style: {
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: 10,
                    border: 'none',
                    borderBottom: '1px solid lightgrey',
                }, autoCorrect: "off", autoComplete: "off", spellCheck: "false", type: "text", value: inputValue, onChange: (e) => onInputChange(e.currentTarget.value, {
                    action: 'input-change',
                }), onMouseDown: (e) => {
                    e.stopPropagation();
                    e.target.focus();
                }, onTouchEnd: (e) => {
                    e.stopPropagation();
                    e.target.focus();
                }, onFocus: onFocus, placeholder: "Search..." }), _jsx(MenuList, Object.assign({}, props, { selectProps: selectProps }))] }));
};
const CustomValueContainer = (_a) => {
    var { children, selectProps } = _a, props = __rest(_a, ["children", "selectProps"]);
    const SingleValues = {
        cx: props.cx,
        clearValue: props.clearValue,
        getStyles: props.getStyles,
        getValue: props.getValue,
        hasValue: props.hasValue,
        isMulti: props.isMulti,
        isRtl: props.isRtl,
        options: props.options,
        selectOption: props.selectOption,
        setValue: props.setValue,
        selectProps,
        theme: props.theme,
    };
    const PlaceHolderProperties = Object.assign({}, props);
    return (_jsx(ValueContainer, Object.assign({}, props, { selectProps: selectProps }, { children: React.Children.map(children, (child) => {
            return child ? (child) : props.hasValue ? (_jsx(SingleValue, Object.assign({}, SingleValues, { isDisabled: selectProps.isDisabled }, { children: selectProps.getOptionLabel(props.getValue()[0]) }))) : (_createElement(Placeholder, Object.assign({}, PlaceHolderProperties, { key: "placeholder", isDisabled: selectProps.isDisabled }), selectProps.placeholder));
        }) })));
};
export const MultiSelect = (_a) => {
    var { value = [], options = [], styles = {}, width = '100%', selectAllLabel = 'All' } = _a, props = __rest(_a, ["value", "options", "styles", "width", "selectAllLabel"]);
    const containerRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const valueRef = useRef(value);
    valueRef.current = value;
    const selectAllOption = {
        value: '<SELECT_ALL>',
        label: selectAllLabel,
    };
    const isSelectAllSelected = () => valueRef.current.length === options.length;
    const isOptionSelected = (option) => valueRef.current.some(({ value }) => value === option.value) || isSelectAllSelected();
    const getOptions = () => [selectAllOption, ...options];
    const getValue = () => (isSelectAllSelected() ? [selectAllOption] : value);
    const changeSelect = (newValue, actionMeta) => {
        const { action, option, removedValue } = actionMeta;
        if (action === 'select-option' && option.value === selectAllOption.value) {
            props.onChange(options, actionMeta);
        }
        else if ((action === 'deselect-option' && option.value === selectAllOption.value) ||
            (action === 'remove-value' && removedValue.value === selectAllOption.value)) {
            props.onChange([], actionMeta);
        }
        else if (actionMeta.action === 'deselect-option' && isSelectAllSelected()) {
            props.onChange(options.filter(({ value }) => value !== option.value), actionMeta);
        }
        else {
            props.onChange(newValue || [], actionMeta);
        }
    };
    const customStyles = {
        container: (base) => (Object.assign(Object.assign({}, base), { width: width })),
    };
    useEffect(() => {
        const onDomClick = (e) => {
            var _a, _b;
            const menu = (_a = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('.select__menu');
            if (!((_b = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target)) ||
                !menu ||
                !menu.contains(e.target)) {
                setIsFocused(false);
                setInputValue('');
            }
        };
        document.addEventListener('mousedown', onDomClick);
        return () => {
            document.removeEventListener('mousedown', onDomClick);
        };
    }, []);
    return (_jsx("div", Object.assign({ ref: containerRef }, { children: _jsx(Select, Object.assign({ isMulti: true, options: getOptions(), value: getValue(), components: {
                MenuList: CustomMenuList,
                ValueContainer: CustomValueContainer,
            }, isOptionSelected: isOptionSelected, hideSelectedOptions: false, closeMenuOnSelect: false, styles: customStyles, inputValue: inputValue, isSearchable: false, onFocus: () => setIsFocused(true), onChange: changeSelect, onInputChange: (val) => setInputValue(val) }, {
            menuIsOpen: isFocused || undefined,
            isFocused: isFocused || undefined,
        })) })));
};
