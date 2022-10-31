import styled from '@emotion/styled';

export const Wrap = styled.div`
  height: calc(100% - 30px);
  display: flex;
  flex-direction: row;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  :not(:last-of-type) {
    border-right: 1px solid #e2e2e2;
    margin-right: 20px;
  }
`;
export const ChartWrap = styled.div`
  height: 100%;
`;

export const ChartWrapTitle = styled.h4``;

export const ChartWrapInfo = styled.div`
  color: #8b8b8b;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  width: 100%;
  justify-content: center;
`;
