import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import styled from '@emotion/styled';
export interface IBreadcrumbsProps extends MuiBreadcrumbsProps {
  crumbs: IMuiTypographyProps[];
}

export interface IMuiTypographyProps extends MuiTypographyProps {
  name: string;
  icon?: React.ReactElement;
}
const CrumbWrap = styled.span`
  font-size: 14px;
  cursor: default;
  display: flex;
`;

const Crumb = ({ icon, name }: IMuiTypographyProps) => {
  return (
    <CrumbWrap>
      {icon}
      {name}
    </CrumbWrap>
  );
};

export const Breadcrumbs = ({ separator = '›', ...props }: IBreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs separator={separator} {...props}>
      {props.crumbs.map((crumb, index) => (
        <Crumb key={index} {...crumb} />
      ))}
    </MuiBreadcrumbs>
  );
};
