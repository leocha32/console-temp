import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useCallback, useState } from 'react';
import { Tabs as CTabs } from 'components/Atoms';
export default {
    title: 'Atoms/Tabs',
    component: CTabs,
};
export const Tabs = (args) => {
    const [value, setValue] = useState(args.items[0].value);
    const handleChange = useCallback((e, value) => {
        setValue(value);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(CTabs, Object.assign({}, args, { value: value, onChange: handleChange })), value] }));
};
Tabs.args = {
    items: [
        { value: 'tab1', label: 'Tab1' },
        { value: 'tab2', label: 'Tab2' },
        { value: 'tab3', label: 'Tap3' },
    ],
};
