import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export type TPageLayoutProps = PropsWithChildren;
export const PageLayout = ({ children }: TPageLayoutProps) => {
  return (
    <Wrap>
      <div>{children}</div>
    </Wrap>
  );
};
