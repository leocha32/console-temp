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
import { MixedChart } from 'mi-ui';
import { DataCardWrap, DiffWrap, DiffInfo, DataValue } from '../components/commonStyled';

export interface ICowayBrandAwarenessProps {
  data: ICowayBrandAwareness[];
}

const MarketingEfficiency = ({ data }: ICowayBrandAwarenessProps) => {
  return (
    <Card>
      <CardTitle>마케팅비 효율</CardTitle>
      {/*{data?.length ? (*/}
      <Section>
        <ContentWrap>
          <ContentTitle>{`CPP`}</ContentTitle>
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

        <ContentWrap>
          {' '}
          <ContentTitle>PLT매출比 비중</ContentTitle>
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
            <MixedChart
              yAxis={[
                {
                  type: 'value',
                  name: 'ccp',
                  axisLabel: {
                    formatter: '{value}(원)',
                  },
                },
                {
                  type: 'value',
                  name: '매출 비중',
                  axisLabel: {
                    formatter: '{value}%',
                  },
                },
              ]}
              legend={{
                data: ['CCP', '매출 비중'],
              }}
              showLegendBottom={false}
              useYAxis
              useTooltip
              data={[
                {
                  name: 'CCP',
                  type: 'bar',
                  data: [
                    150550, 150550, 102105, 200305, 183020, 142060, 167291, 90820, 192038,
                    178291, 164231, 182948,
                  ],
                },
                {
                  name: '매출 비중',
                  type: 'line',
                  data: [5, 5.2, 5.8, 3.2, 10.1, 8.8, 7.5, 6.8, 9.8, 7.9, 11.4, 8.2],
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

export default MarketingEfficiency;
