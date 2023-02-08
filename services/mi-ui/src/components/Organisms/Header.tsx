import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { UserInfo, IUserInfoProps } from './UserInfo';
export interface IHeaderProps extends PropsWithChildren {
  height?: number;
  onClick?: () => void;
  userInfo?: IUserInfoProps;
}

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.1);
  z-index: 99;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 20px;
  height: ${({ height }: { height: number }) => `${height}px`};
  color: ${({ theme }) => theme.color.primary.PRIMARY_800};
  background-color: ${({ theme }) => theme.color.mono.MONO_WHITE};
`;

const TitleWrap = styled.div`
  cursor: pointer;
`;

export const Header = ({ children, height = 40, onClick, userInfo }: IHeaderProps) => {
  return (
    <HeaderWrap height={height}>
      <TitleWrap onClick={onClick}> {children}</TitleWrap>
      <UserInfo {...userInfo} />
    </HeaderWrap>
  );
};
