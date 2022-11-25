import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Card as MuiCard, CardActionArea as MuiCardActionArea, CardActions as MuiCardActions, CardContent as MuiCardContent, } from '@mui/material';
export const Card = (props) => {
    return _jsx(MuiCard, Object.assign({}, props));
};
export const CardContent = (props) => {
    return _jsx(MuiCardContent, Object.assign({}, props));
};
export const CardActionArea = (props) => {
    return _jsx(MuiCardActionArea, Object.assign({}, props));
};
export const CardActions = (props) => {
    return _jsx(MuiCardActions, Object.assign({}, props));
};
