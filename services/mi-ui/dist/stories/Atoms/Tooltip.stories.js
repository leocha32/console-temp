import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Button, Tooltip as CTooltip } from 'components/Atoms';
export default {
    title: 'Atoms/Tooltip',
    component: CTooltip,
};
export const Tooltip = (args) => (_jsx(CTooltip, Object.assign({}, args)));
Tooltip.args = {
    title: 'tooltip',
    children: _jsx(Button, Object.assign({ variant: "outlined" }, { children: "tooltip" })),
};
