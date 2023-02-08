import React from 'react';
import {
  Card,
  Content,
  ContentTitle,
  ContentWrap,
  DataValue,
  DataWrap,
} from '$pages/Report/commonStyled';
import DataCard from '$pages/Report/Marketing/components/DataCard';
import { TOnlinePerformance } from '$modules/report';
import { marketingDigital } from '$recoils/filter';
import { useRecoilValue } from 'recoil';

export interface ICardSectionProps {
  data: TOnlinePerformance;
}
export const CardSection = ({ data }: ICardSectionProps) => {
  const { category1, isCompare } = useRecoilValue(marketingDigital);

  return (
    <Card>
      <ContentWrap>
        <Content>
          <ContentTitle>신청 실적</ContentTitle>
          {category1 === '제품' ? (
            <DataWrap>
              <DataValue
                css={(theme) => `
                  color: ${theme.palettes.gray.GRAY_500};
                  font-size: 20px;
                `}
              >
                (서비스 한정)
              </DataValue>
            </DataWrap>
          ) : (
            <DataCard
              isCompare={isCompare}
              unit={'건'}
              value={data?.clicks}
              diffValue={data?.clicksDiff}
              compValue={data?.clicksComp}
            />
          )}
        </Content>
        <Content>
          <ContentTitle>주문 실적</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'건'}
            value={data?.orders}
            format={(value) => value.toLocaleString('ko-KR')}
            diffValue={data?.ordersDiff}
            compValue={data?.ordersComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>광고비</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'원'}
            value={data?.adsCost}
            format={(value) => value.toLocaleString('ko-KR')}
            diffValue={data?.adsCostDiff}
            compValue={data?.adsCostComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>NCPP</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'원'}
            value={data?.ncpp}
            format={(value) => value.toLocaleString('ko-KR')}
            diffValue={data?.ncppDiff}
            compValue={data?.ncppComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>eROAS</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'%'}
            value={data?.eroas}
            format={(value) => Number(value).toFixed(1)}
            diffValue={data?.eroasDiff}
          ></DataCard>
        </Content>
      </ContentWrap>
    </Card>
  );
};
