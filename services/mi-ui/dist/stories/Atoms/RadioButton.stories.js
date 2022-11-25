import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// Components
import { RadioButton as CRadioButton, FlexDirection, } from 'components/Atoms';
export default {
    title: 'Atoms/RadioButton',
    component: CRadioButton,
};
export const RadioButton = (args) => _jsx(CRadioButton, Object.assign({}, args));
RadioButton.args = {
    options: ['A', 'B', 'C'],
    flexDirection: FlexDirection.ROW,
    color: 'primary',
};
