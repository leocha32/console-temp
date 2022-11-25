import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import DeleteIcon from '@mui/icons-material/Delete';
// Components
import { IconButton as CIconButton } from 'components/Atoms';
export default {
    title: 'Atoms/Button',
    component: CIconButton,
};
export const IconButton = (args) => _jsx(CIconButton, Object.assign({}, args));
IconButton.args = {
    children: _jsx(DeleteIcon, {}),
};
