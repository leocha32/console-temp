import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useCallback, useState } from 'react';
// Components
import { Select as CSelect } from 'components/Atoms';
export default {
    title: 'Atoms/Select',
    component: CSelect,
};
export const Select = (args) => {
    const [selected, setSelected] = useState('');
    const handleChange = useCallback((value) => {
        setSelected(value);
    }, []);
    return _jsx(CSelect, Object.assign({}, args, { onChange: handleChange, value: selected }));
};
Select.args = {
    options: [
        { value: 'test1', label: 'test1' },
        { value: 'test2', label: 'test2' },
    ],
};
export const MultiSelect = (args) => {
    const [selected, setSelected] = useState([]);
    const handleChange = useCallback((value) => {
        setSelected(value);
    }, []);
    return _jsx(CSelect, Object.assign({}, args, { onChange: handleChange, value: selected }));
};
MultiSelect.args = {
    multiple: true,
    useSearch: true,
    options: [
        { value: 'test1', label: 'test1' },
        { value: 'test2', label: 'test2' },
    ],
};
