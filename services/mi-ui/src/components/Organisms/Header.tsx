import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
export interface IHeaderProps extends PropsWithChildren {
  height?: number;
  onClick?: () => void;
  useClock?: boolean;
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

const ClockWrap = styled.span`
  color: ${({ theme }) => theme.palettes.gray.GRAY_900};
  font-weight: 500;
  font-size: 14px;
`;
dayjs.locale('ko');
const date = dayjs().format('YYYY. MM. DD(dd)');
export const Header = ({ children, height = 40, useClock = true, onClick }: IHeaderProps) => {
  return (
    <HeaderWrap height={height}>
      <TitleWrap onClick={onClick}> {children}</TitleWrap>
      {useClock && <ClockWrap>{date}</ClockWrap>}
    </HeaderWrap>
  );
};
