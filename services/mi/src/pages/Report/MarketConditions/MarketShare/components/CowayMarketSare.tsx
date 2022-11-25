import React from 'react';
import styled from '@emotion/styled';
import { ICompetitorComparison, ICowayMarketShare } from '$modules/report/research';
import { CardTitle, Card, Content, ContentWrap } from '$pages/Report/commonStyled';
import { MarketShareContrast } from './MarketShareContrast';
import { css } from '@emotion/react';

export interface ICowayBrandAwarenessProps {
  cowayMarketShare: ICowayMarketShare[];
  competitorComparison: ICompetitorComparison[];
}

const dataValueStyle = (theme) => ({
  color: theme.color.primary.PRIMARY_900,
  fontSize: '72px',
  fontWeight: 600,
});

const DiffInfoWrap = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.palettes.gray.GRAY_500};
`;
const DiffBox = styled.div`
  transform: ${({ value }: { value: number }) => (value > 0 ? 'rotate(180deg)' : 'none')};
  color: ${({ value }: { value: number }) => (value > 0 ? 'red' : 'blue')};
  width: fit-content;
`;

const DiffInfo = ({ value, valueDiff }: { value: number; valueDiff: number }) => {
  return (
    <DiffInfoWrap>
      {value ? (
        <>
          <span>{`전년 동기 ${value}% `}</span>(
          {
            <>
              {valueDiff}% <DiffBox value={valueDiff}>▼</DiffBox>
            </>
          }
          )
        </>
      ) : (
        <>직전 동기 데이터 없음</>
      )}
    </DiffInfoWrap>
  );
};

export const CowayMarketSare = ({
  cowayMarketShare,
  competitorComparison,
}: ICowayBrandAwarenessProps) => {
  const {
    marketShareValue = 0,
    marketShareYoyValue = 0,
    yoyDiff,
  } = cowayMarketShare[0] || {};
  return (
    <Card>
      <CardTitle>코웨이 시장점유율</CardTitle>
      <ContentWrap direction={'column'}>
        <Content
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div css={dataValueStyle}>{marketShareValue}%</div>
          <DiffInfo value={marketShareYoyValue} valueDiff={yoyDiff} />
        </Content>
        <Content flex={2}>
          <MarketShareContrast data={competitorComparison}></MarketShareContrast>
        </Content>
      </ContentWrap>
    </Card>
  );
};
