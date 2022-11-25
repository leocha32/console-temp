import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
import { menu } from 'constants/mock';
// Components
import { Layout as CLayout } from 'components/Templates';
export default {
    title: 'Templates/Layout',
    component: CLayout,
};
export const Layout = (props) => {
    const [menuStatus, setMenuStatus] = useState({
        open: true,
        expands: [],
    });
    return _jsx(CLayout, Object.assign({}, props, { menuStatusHook: [menuStatus, setMenuStatus] }));
};
Layout.args = {
    menu,
    header: _jsx("h2", { children: "Storybook" }),
};
