import React from 'react';
import styled from '@emotion/styled';
import { ICowayMarketShare } from '$modules/report';
import { CardTitle } from '$pages/Report/MarketConditions/components/commonStyled';
import { Card as MiCard } from 'mi-ui/src';

export interface ICowayBrandAwarenessProps {
  data: ICowayMarketShare[];
}

const Card = styled(MiCard)`
  background-color: #fafafa;
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

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
          <span>{`직전 동기 ${value}% `}</span>(
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

export const CowayMarketSare = ({ data }: ICowayBrandAwarenessProps) => {
  const { marketShareValue = 0, marketShareYoyValue = 0, yoyDiff } = data[0] || {};
  return (
    <Card>
      <CardTitle>코웨이 시장점유율</CardTitle>
      <Div>
        <div css={dataValueStyle}>{marketShareValue}%</div>
        <DiffInfo value={marketShareYoyValue} valueDiff={yoyDiff} />
      </Div>
    </Card>
  );
};
