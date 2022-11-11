import React from 'react';
import { DiffBox } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const DiffInfoWrap = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.palettes.gray.GRAY_800};
`;

export const DataCardTitle = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.palettes.gray.GRAY_800};
  text-align: center;
  margin-bottom: 5px;
`;

export const DataCardDescription = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.palettes.gray.GRAY_500};
`;

export const DataCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const DiffWrap = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DataValue = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) => (
  <div
    css={css`
      margin-bottom: 10px;
    `}
  >
    <DataCardTitle>{`${title} ${value}`}</DataCardTitle>
    <DataCardDescription>{description}</DataCardDescription>
  </div>
);

export const DiffInfo = ({
  value,
  valueDiff,
  title,
}: {
  value: number;
  valueDiff: number;
  title: string;
}) => {
  return (
    <DiffInfoWrap>
      {value ? (
        <>
          <span>{`${title} ${value}% `}</span>
          <span
            css={css`
              display: flex;
            `}
          >
            (
            {valueDiff ? (
              <>
                {valueDiff}%<DiffBox value={valueDiff}>▼</DiffBox>
              </>
            ) : (
              '◆'
            )}
            )
          </span>
        </>
      ) : (
        <>직전 반기 데이터 없음</>
      )}
    </DiffInfoWrap>
  );
};
