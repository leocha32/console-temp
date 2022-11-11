import React from 'react';
import { ICowayBrandAwareness } from '$modules/report/marketConditions/brandAwareness';

import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
import {
  Card,
  Section,
  ContentWrap,
  CardTitle,
  ContentTitle,
  ChartWrap,
} from '$pages/Report/commonStyled';
import { DataValue, DataCardWrap, DiffWrap, DiffInfo } from '../components/commonStyled';
import { BarChart } from 'mi-ui/src';

export interface ICowayBrandAwarenessProps {
  data: ICowayBrandAwareness[];
}

const MarketingStatus = ({ data }: ICowayBrandAwarenessProps) => {
  return (
    <Card>
      <CardTitle>마케팅비 현황</CardTitle>
      {/*{data?.length ? (*/}
      <Section>
        <ContentWrap>
          <ContentTitle>{`마케팅비`}</ContentTitle>
          <DataCardWrap>
            <DataValue
              value={'50억'}
              title={'전체'}
              description={'(TV 30억 / 온라인 10억 / 기타 10억)'}
            />
            <DataValue
              value={'30억'}
              title={'정수기'}
              description={'(TV 30억 / 온라인 10억 / 기타 10억)'}
            />
            <DiffWrap>
              <DiffInfo value={23.5} title={'전월 比'} valueDiff={10} />
              <DiffInfo value={23.5} title={'전년 동일 比'} valueDiff={-10} />
            </DiffWrap>
          </DataCardWrap>
        </ContentWrap>
        <ContentWrap flex={2}>
          <ChartWrap>
            <BarChart
              data={[
                {
                  name: '마케팅비 (억원)',
                  data: [20, 20, 30, 15, 45, 50, 10, 5, 70, 62, 43, 22],
                },
              ]}
              xAixData={[
                '1월',
                '2월',
                '3월',
                '4월',
                '5월',
                '6월',
                '7월',
                '8월',
                '9월',
                '10월',
                '11월',
                '12월',
              ]}
            />
          </ChartWrap>
        </ContentWrap>
      </Section>
      {/*) : (*/}
      {/*  <EmptyContent />*/}
      {/*)}*/}
    </Card>
  );
};

export default MarketingStatus;
