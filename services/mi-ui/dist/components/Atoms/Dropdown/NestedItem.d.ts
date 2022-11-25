import React, { ReactNode } from 'react';
import { MenuItemProps } from '@mui/material';
export interface INestedItemProps extends MenuItemProps {
    parentMenuOpen: boolean;
    component?: React.ElementType;
    label?: React.ReactNode;
    icon?: ReactNode;
}
export declare const NestedItem: ({ parentMenuOpen, disabled, children, label, icon, ...menuItemProps }: INestedItemProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NestedItem.d.ts.map