import { SelectProps } from '@mui/material';
export interface ISelectOption {
    value: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
}
export interface ISelectProps extends Omit<SelectProps, 'onChange'> {
    options: ISelectOption[];
    onChange: (value: string | string[]) => void;
    useSearch?: boolean;
    defaultLabel?: string;
    useAllCheck?: boolean;
    title?: string;
}
export declare const Select: ({ multiple, title, displayEmpty, onChange, options, value: values, useSearch, useAllCheck, defaultLabel, ...props }: ISelectProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map