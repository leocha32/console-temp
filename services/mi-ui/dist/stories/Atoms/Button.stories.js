import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// Components
import { Button } from 'components/Atoms';
export default {
    title: 'Atoms/Button',
    component: Button,
};
export const PrimaryButton = (args) => (_jsx(Button, Object.assign({}, args)));
PrimaryButton.args = {
    children: 'Buttontesgt',
    color: 'primary',
};
export const DisabledButton = (args) => (_jsx(Button, Object.assign({}, args)));
DisabledButton.args = {
    children: 'Button',
    disabled: true,
};
