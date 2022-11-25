import React from 'react';
import { BreadcrumbsProps as MuiBreadcrumbsProps, TypographyProps as MuiTypographyProps } from '@mui/material';
export interface IBreadcrumbsProps extends MuiBreadcrumbsProps {
    crumbs: IMuiTypographyProps[];
}
export interface IMuiTypographyProps extends MuiTypographyProps {
    name: string;
    icon?: React.ReactElement;
}
export declare const Breadcrumbs: ({ separator, ...props }: IBreadcrumbsProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Breadcrumbs.d.ts.map