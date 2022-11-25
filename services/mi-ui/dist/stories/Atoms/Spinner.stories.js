import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// Components
import { Spinner as CSpinner } from 'components/Atoms';
export default {
    title: 'Atoms/Spinner',
    component: CSpinner,
};
export const Spinner = (args) => (_jsx(CSpinner, Object.assign({}, args)));
Spinner.args = {
    color: 'red',
};
