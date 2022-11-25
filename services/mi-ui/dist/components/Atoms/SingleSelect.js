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
import Select, { components } from 'react-select';
const NoOptionsMessage = (props) => {
    return _jsx(components.NoOptionsMessage, Object.assign({}, props));
};
export const SingleSelect = (_a) => {
    var { width = '300px' } = _a, props = __rest(_a, ["width"]);
    return (_jsx(Select, Object.assign({}, props, { isMulti: false, components: { NoOptionsMessage }, styles: {
            noOptionsMessage: (base) => (Object.assign({}, base)),
            container: (base) => (Object.assign(Object.assign({}, base), { width: width })),
            control: (base) => (Object.assign(Object.assign({}, base), { backgroundColor: 'white' })),
            option: (base) => {
                return Object.assign({}, base);
            },
        } })));
};
