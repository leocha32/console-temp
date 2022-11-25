import { ElementType, ReactNode } from 'react';
import { ButtonProps, PopoverOrigin } from '@mui/material';
export interface IOptionProps {
    label: ReactNode;
    key: string;
    disabled?: boolean;
    children?: IOptionProps[];
}
export interface IDropdownProps {
    title?: ReactNode;
    options: IOptionProps[];
    buttonProps?: ButtonProps;
    onClickOption: (key: string) => void;
    Component?: ElementType;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}
export declare const renderMenu: (options: IOptionProps[], open: boolean, onClickOption: IDropdownProps['onClickOption']) => import("@emotion/react/jsx-runtime").JSX.Element[];
export declare const Dropdown: ({ onClickOption, buttonProps, title, options, Component, anchorOrigin, transformOrigin, }: IDropdownProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map