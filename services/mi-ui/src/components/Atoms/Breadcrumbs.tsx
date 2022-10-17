import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';

export interface IBreadcrumbsProps extends MuiBreadcrumbsProps {
  crumbs: IMuiTypographyProps[];
}

export interface IMuiTypographyProps extends MuiTypographyProps {
  name: string;
  icon?: React.ReactElement;
}

export const Breadcrumbs = (props: IBreadcrumbsProps) => {
  const Crumb = (props: IMuiTypographyProps) => {
    return (
      <MuiTypography>
        <>
          {props?.icon}
          {props?.name}
        </>
      </MuiTypography>
    );
  };
  const Crumbs = props?.crumbs?.map((crumb, index) => <Crumb key={index} {...crumb} />);

  return <MuiBreadcrumbs {...props}>{Crumbs}</MuiBreadcrumbs>;
};
