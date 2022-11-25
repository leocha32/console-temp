import { ButtonProps as MuiButtonProps } from '@mui/material';
export interface IButtonProps extends MuiButtonProps {
    label?: string;
    showLoading?: boolean;
    spinnerSize?: number;
}
export declare const Button: ({ showLoading, label, variant, spinnerSize, ...props }: IButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Button.d.ts.map