import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Dropdown as CDropdown } from 'components/Atoms';
export default {
    title: 'Atoms/Dropdown',
    component: CDropdown,
};
export const Dropdown = (args) => {
    return _jsx(CDropdown, Object.assign({}, args));
};
Dropdown.args = {
    title: 'test',
    buttonProps: {
        variant: 'outlined',
    },
    options: [
        {
            label: 'test1',
            key: 'test1',
        },
        {
            label: 'test2',
            key: 'test2',
            children: [
                {
                    label: 'test1',
                    key: 'test3',
                },
                {
                    label: 'test1',
                    key: 'test4',
                },
            ],
        },
    ],
};
