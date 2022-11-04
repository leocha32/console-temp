import React from 'react';
import { ICowayBrandAwareness } from '$modules/report/marketConditions/brandAwareness';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
import {
  DiffBox,
  Card,
  Section,
  ContentWrap,
  CardTitle,
  ContentTitle,
} from '$pages/Report/MarketConditions/components/commonStyled';

export interface ICowayBrandAwarenessProps {
  data: ICowayBrandAwareness[];
}

export const DataWrap = styled.div`
  display: flex;
  flex: ${({ flex }: { flex: number }) => flex};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const dataValueStyle = (theme) => ({
  color: theme.color.primary.PRIMARY_900,
  fontSize: '72px',
  fontWeight: 600,
});

export const dataRankStyle = (theme) => ({
  color: theme.palettes.gray.GRAY_700,
  fontSize: '60px',
  fontWeight: 600,
  flex: 1,
  display: 'flex',
  borderRight: `1px solid ${theme.palettes.gray.GRAY_500}`,
  alignItems: 'center',
  justifyContent: 'center',
});

export const DiffInfoWrap = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.palettes.gray.GRAY_500};
`;

const DiffInfo = ({ value, valueDiff }: { value: number; valueDiff: number }) => {
  return (
    <DiffInfoWrap>
      {value ? (
        <>
          <span>{`직전 반기 ${value}% `}</span>
          <span
            css={css`
              display: flex;
            `}
          >
            (
            {valueDiff ? (
              <>
                {valueDiff}%<DiffBox value={valueDiff}>▼</DiffBox>{' '}
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

const DataCard = ({
  hohValue,
  hohValueDiff,
  value,
  flex = 1,
}: {
  hohValue: number;
  hohValueDiff: number;
  value: number;
  flex?: number;
}) => (
  <DataWrap flex={flex}>
    <div css={dataValueStyle}>{value}%</div>
    <DiffInfo value={hohValue} valueDiff={hohValueDiff} />
  </DataWrap>
);

export const CowayBrandAwareness = ({ data }: ICowayBrandAwarenessProps) => {
  return (
    <Card direction={'column'}>
      <CardTitle>코웨이 브랜드 인지도</CardTitle>
      {data?.length ? (
        <Section>
          <ContentWrap>
            <ContentTitle>{`최초 상기도`}</ContentTitle>
            <div
              css={css`
                display: flex;
                flex: 1;
                flex-direction: row;
              `}
            >
              <div css={dataRankStyle}>{data[0]?.topOfMindRank}위</div>
              <DataCard
                flex={2}
                value={data[0]?.topOfMind}
                hohValue={data[0]?.topOfMindHoh}
                hohValueDiff={data[0]?.topOfMindHohDiff}
              ></DataCard>
            </div>
          </ContentWrap>
          <ContentWrap>
            <ContentTitle>비보조 인지도</ContentTitle>
            <DataCard
              value={data[0]?.unaidedAwareness}
              hohValue={data[0]?.unaidedAwarenessHoh}
              hohValueDiff={data[0]?.unaidedAwarenessHohDiff}
            ></DataCard>
          </ContentWrap>
          <ContentWrap>
            <ContentTitle>보조 인지도</ContentTitle>
            <DataCard
              value={data[0]?.aidedAwareness}
              hohValue={data[0]?.aidedAwarenessHoh}
              hohValueDiff={data[0]?.aidedAwarenessHohDiff}
            ></DataCard>
          </ContentWrap>
        </Section>
      ) : (
        <EmptyContent />
      )}
    </Card>
  );
};
