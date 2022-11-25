import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
import { menu } from 'constants/mock';
// Components
import { Snb as CSnb } from 'components/Organisms';
export default {
    title: 'Organisms/Snb',
    component: CSnb,
};
export const Snb = ({ menu }) => {
    const [menuStatus, setMenuStatus] = useState({ open: true, expands: [] });
    return _jsx(CSnb, { menu: menu, menuStatusHook: [menuStatus, setMenuStatus] });
};
Snb.args = {
    menu,
};
