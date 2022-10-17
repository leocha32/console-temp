import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export interface IHeaderProps extends PropsWithChildren {
  height?: number;
  onClick?: () => void;
}

const HeaderWrap = styled.div`
  display: flex;
  z-index: 99;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 20px;
  height: ${({ height }: { height: number }) => `${height}px`};
  color: ${({ theme }) => theme.color.mono.MONO_WHITE};
  background-color: ${({ theme }) => theme.color.primary.PRIMARY_700};
`;

const TitleWrap = styled.div`
  cursor: pointer;
`;

export const Header = ({ children, height = 40, onClick }: IHeaderProps) => {
  return (
    <HeaderWrap height={height}>
      <TitleWrap onClick={onClick}> {children}</TitleWrap>
    </HeaderWrap>
  );
};
