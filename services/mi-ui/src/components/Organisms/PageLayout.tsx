import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { IBreadcrumbsProps, Breadcrumbs } from '../Atoms';

export interface IPageLayoutProps
  extends PropsWithChildren,
    Omit<IBreadcrumbsProps, 'crumbs'> {
  headerName: string;
  crumbs?: IBreadcrumbsProps['crumbs'];
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
export const HeaderTitle = styled.h2`
  color: #191f28;
  margin: 0;
`;
export const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageLayout = forwardRef(function PageLayout(
  { children, headerName, crumbs = [] }: IPageLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Wrap ref={ref}>
      <Header>
        <HeaderTitle>{headerName}</HeaderTitle>
        <Breadcrumbs crumbs={crumbs}></Breadcrumbs>
      </Header>
      <Body>{children}</Body>
    </Wrap>
  );
});
