import React from 'react';
import { DiffBox } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';

export const DataCardWrap = styled.div`
  padding: 20px 30px 10px 0px;
  line-height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const CostsWrap = styled.div`
  margin-bottom: 12px;
`;
export const CostsContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.palettes.gray.GRAY_800};
`;

export const CostsDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_600};
  display: flex;
  font-weight: 500;
  justify-content: end;
  text-align: end;
`;

export const DiffWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  align-items: end;
  font-weight: 600;
  color: ${({ theme }) => theme.palettes.gray.GRAY_800};
`;

export const DiffContent = styled.div`
  display: flex;
`;
export const DiffTitle = styled.div`
  width: 100px;
`;
export const DiffValue = styled.div`
  display: flex;
`;

export const Cost = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description?: string;
}) => (
  <CostsWrap>
    <CostsContent>
      <div>{title}</div>
      <div>{value}</div>
    </CostsContent>
    {description ? <CostsDescription>{description}</CostsDescription> : null}
  </CostsWrap>
);
export const DiffInfo = ({
  title,
  value,
  unit = '%',
}: {
  title: string;
  value?: number;
  unit?: string;
}) => (
  <DiffContent>
    <DiffTitle>{title}</DiffTitle>
    {value ? (
      <DiffValue>
        {`${Math.abs(value)}${unit}`}
        {value ? <DiffBox value={value}>▼</DiffBox> : '◆'}
      </DiffValue>
    ) : (
      '데이터 없음'
    )}
  </DiffContent>
);
