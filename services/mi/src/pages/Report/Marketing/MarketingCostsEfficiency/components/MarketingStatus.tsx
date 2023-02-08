import React, { useMemo } from 'react';
import _ from 'lodash';
import {
  Card,
  Content,
  ContentWrap,
  CardTitle,
  ContentTitle,
  ChartWrap,
} from '$pages/Report/commonStyled';
import { DataCardWrap, DiffWrap, Cost, DiffInfo } from '../components/commonStyled';
import { IStackChartProps } from 'mi-ui/src';
import { StackChart } from '$components/Charts';
import {
  TMarketingCostByMedia,
  TMarketingCostByMonth,
  TMarketingCostStatus,
} from '$modules/report/marketing';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';

export interface IMarketingStatusProps {
  data: TMarketingCostStatus;
}

const makeChartData = (
  originData: TMarketingCostByMonth[],
): {
  xAixData: string[];
  data: IStackChartProps['data'];
} => {
  const data = {};
  const xAixData = _.uniqBy(originData, 'yearMonth').map(({ yearMonth }) => yearMonth);

  originData.forEach(({ media, cost, yearMonth }) => {
    const xAixDataIdx = xAixData.indexOf(yearMonth);
    if (!data[media]) {
      data[media] = {
        name: media,
        stack: 'brand',
        data: Array(xAixData.length).fill('-'),
      };
    }
    data[media].data[xAixDataIdx] = cost;
  });
  return {
    xAixData: xAixData.map((yearMonth) => {
      const year = yearMonth.substr(2, 2);
      const month = yearMonth.substr(-2);
      return `${year}년 ${month}월`;
    }),
    data: Object.values(data),
  };
};

const gridOption = {
  left: 30,
  right: 20,
  bottom: 20,
};
const yAxisOption = {
  name: '[단위: 억원]',
};

const makeCostDescription = (data: TMarketingCostByMedia[]) => {
  return `( ${data.map(({ cost, media }) => `${media} ${cost}억`).join(' | ')} )`;
};

const MarketingStatus = ({ data: originData }: IMarketingStatusProps) => {
  const { data, xAixData } = makeChartData(originData?.marketingCostByMonths || []);
  const allMarketingCosts = useMemo(
    () =>
      originData?.marketingCosts?.reduce((pre, cur) => {
        return pre + cur.cost;
      }, 0),
    [originData],
  );
  const allMarketingCostBySelectedItems = useMemo(
    () =>
      originData?.marketingCostBySelectedItems?.reduce((pre, cur) => {
        return pre + cur.cost;
      }, 0),
    [originData],
  );

  return (
    <Card flex={1}>
      <CardTitle>마케팅비 현황</CardTitle>
      <ContentWrap>
        <Content>
          <ContentTitle>{`마케팅비`}</ContentTitle>
          {originData?.marketingCostCompare ? (
            <DataCardWrap>
              <div>
                <Cost
                  title={'전체'}
                  value={`${allMarketingCosts?.toFixed(1)}억`}
                  description={makeCostDescription(originData?.marketingCosts)}
                />
                {originData?.marketingCostBySelectedItems.length ? (
                  <Cost
                    title={'선택한 제품군'}
                    value={`${allMarketingCostBySelectedItems?.toFixed(1)}억`}
                    description={makeCostDescription(
                      originData?.marketingCostBySelectedItems,
                    )}
                  />
                ) : null}
              </div>

              <DiffWrap>
                <div>
                  <DiffInfo
                    title={'전월 比'}
                    value={originData?.marketingCostCompare.mom}
                  />
                  <DiffInfo
                    title={'전년 동월 比'}
                    value={originData?.marketingCostCompare.yoy}
                  />
                </div>
              </DiffWrap>
            </DataCardWrap>
          ) : (
            <EmptyContent />
          )}
        </Content>
        <Content flex={4}>
          <ChartWrap>
            <StackChart
              useAccumulate
              data={data}
              textFormat={(value) => value.toFixed(1)}
              xAixData={xAixData}
              grid={gridOption}
              yAxis={yAxisOption}
            />
          </ChartWrap>
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default MarketingStatus;
