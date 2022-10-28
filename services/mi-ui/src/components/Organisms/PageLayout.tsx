import React, { PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';

export interface IPageLayoutProps extends PropsWithChildren {
  header: ReactElement;
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  margin-bottom: 15px;
`;
export const HeaderTitle = styled.h2`
  color: #191f28;
  margin: 0;
`;
export const PageLayout = ({ children, header }: IPageLayoutProps) => {
  return (
    <Wrap>
      <Header>{header}</Header>
      <div>{children}</div>
    </Wrap>
  );
};
