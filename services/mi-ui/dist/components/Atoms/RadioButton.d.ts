import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material';
export interface IRadioGroupProps extends MuiRadioGroupProps {
    options: string[];
    flexDirection?: FlexDirection;
    label?: string;
}
export declare enum FlexDirection {
    COLUMN = "column",
    ROW = "row",
    ROW_REVERSE = "row-reverse",
    COLUMN_REVERSE = "column-reverse"
}
export declare const RadioButton: ({ options, flexDirection, onChange, label, ...props }: IRadioGroupProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RadioButton.d.ts.map