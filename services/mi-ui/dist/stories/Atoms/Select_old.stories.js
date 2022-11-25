import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
// Components
import { SingleSelect as CSelect, MultiSelect as CMultiSelect, } from 'components/Atoms';
export default {
    title: 'Atoms/Select_old',
    components: [CSelect, CMultiSelect],
};
export const Select = (args) => (_jsx(CSelect, Object.assign({}, args)));
Select.args = {
    isMulti: false,
    options: [
        {
            label: '2021',
            value: '2021',
        },
        {
            label: '2022',
            value: '2022',
        },
        {
            label: '2023',
            value: '2023',
        },
    ],
};
export const MultiSelect = (args) => {
    const [selected, setSelected] = useState([]);
    const onChange = (value) => {
        setSelected(value);
    };
    return _jsx(CMultiSelect, Object.assign({}, args, { value: selected, onChange: onChange }));
};
MultiSelect.args = {
    width: '300px',
    options: [
        { value: '1', label: 'Jimmy' },
        { value: '2', label: 'Laura' },
        { value: '3', label: 'Tommy' },
        { value: '4', label: 'Jane' },
        { value: '5', label: 'Mike' },
    ],
    selectAllLabel: '모두선택',
};
