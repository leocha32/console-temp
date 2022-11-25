import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// Components
import { Header as CHeader } from 'components/Organisms';
export default {
    title: 'Organisms/Header',
    component: CHeader,
};
export const Header = (props) => _jsx(CHeader, Object.assign({}, props));
Header.args = {
    children: _jsx("h2", { children: "Storybook" }),
};
