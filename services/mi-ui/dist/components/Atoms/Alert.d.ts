import { DialogProps } from '@mui/material';
export interface IAlertProps extends DialogProps {
    title: string;
    text: string;
    buttonText?: string;
    onClose: () => void;
    disableBackdropClick?: boolean;
    type?: Type;
}
export declare enum Type {
    INFO = "info",
    ERROR = "error"
}
export declare const Alert: ({ open, title, text, onClose, disableEscapeKeyDown, disableBackdropClick, type, buttonText, ...props }: IAlertProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SampleAlert: ({ ...props }: IAlertProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Alert.d.ts.map