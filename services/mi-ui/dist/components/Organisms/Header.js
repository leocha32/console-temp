import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
const HeaderWrap = styled.div `
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.1);
  z-index: 99;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 20px;
  height: ${({ height }) => `${height}px`};
  color: ${({ theme }) => theme.color.primary.PRIMARY_800};
  background-color: ${({ theme }) => theme.color.mono.MONO_WHITE};
`;
const TitleWrap = styled.div `
  cursor: pointer;
`;
const ClockWrap = styled.span `
  color: ${({ theme }) => theme.palettes.gray.GRAY_900};
  font-weight: 500;
  font-size: 14px;
`;
dayjs.locale('ko');
const date = dayjs().format('YYYY. MM. DD(dd)');
export const Header = ({ children, height = 40, useClock = true, onClick }) => {
    return (_jsxs(HeaderWrap, Object.assign({ height: height }, { children: [_jsxs(TitleWrap, Object.assign({ onClick: onClick }, { children: [" ", children] })), useClock && _jsx(ClockWrap, { children: date })] })));
};
