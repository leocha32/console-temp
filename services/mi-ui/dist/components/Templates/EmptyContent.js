import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';
const Wrap = styled.div `
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LabelWrap = styled.div `
  color: #b8b1b1;
  font-size: 14px;
  margin-top: 10px;
`;
export const EmptyContent = ({ label = '데이터가 존재하지 않습니다.', }) => {
    return (_jsxs(Wrap, { children: [_jsx(InfoIcon, { sx: { color: '#a3a0a0' } }), _jsx(LabelWrap, { children: label })] }));
};
