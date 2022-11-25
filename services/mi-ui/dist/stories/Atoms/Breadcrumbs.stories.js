import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Breadcrumbs as CBreadcrumbs } from 'components/Atoms';
import Home from '@mui/icons-material/Home';
export default {
    title: 'Atoms/Breadcrumbs',
    component: CBreadcrumbs,
};
export const Breadcrumbs = (args) => _jsx(CBreadcrumbs, Object.assign({}, args));
Breadcrumbs.args = {
    crumbs: [{ name: 'HOME', icon: _jsx(Home, {}) }, { name: 'Atoms' }, { name: 'Breadcrumbs' }],
};
