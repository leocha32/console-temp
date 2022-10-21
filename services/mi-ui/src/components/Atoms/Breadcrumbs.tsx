import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  TypographyProps as MuiTypographyProps,
  Link as MuiLink,
} from '@mui/material';

export interface IBreadcrumbsProps extends MuiBreadcrumbsProps {
  crumbs: IMuiTypographyProps[];
}

export interface IMuiTypographyProps extends MuiTypographyProps {
  name: string;
  icon?: React.ReactElement;
}

const Crumb = ({ icon, name }: IMuiTypographyProps) => {
  return (
    <MuiLink
      underline="hover"
      color="inherit"
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      {icon}
      {name}
    </MuiLink>
  );
};

export const Breadcrumbs = (props: IBreadcrumbsProps) => {
  const Crumbs = props?.crumbs?.map((crumb, index) => <Crumb key={index} {...crumb} />);

  return <MuiBreadcrumbs {...props}>{Crumbs}</MuiBreadcrumbs>;
};
