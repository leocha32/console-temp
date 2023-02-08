import { useMemo } from 'react';
import _ from 'lodash';
import {
  Card,
  Content,
  CardTitle,
  ContentTitle,
  ChartWrap,
  ContentWrap,
} from '$pages/Report/commonStyled';
import { IMixedChartProps } from 'mi-ui';
import { MixedChart } from '$components/Charts';
import { DataCardWrap, Cost, DiffWrap, DiffInfo } from '../components/commonStyled';
import {
  TMarketingEfficiencyByMonth,
  TMarketingEfficiencyStatus,
} from '$modules/report/marketing';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
export interface IMarketingEfficiencyProps {
  data: TMarketingEfficiencyStatus;
}
const gridOption = {
  left: 50,
  right: 40,
  bottom: 20,
};

const SPLIT_NUMBER = 4;

const makeChartData = (
  originData: TMarketingEfficiencyByMonth[],
): {
  xAixData: string[];
  data: IMixedChartProps['data'];
} => {
  const data = {};
  const xAixData = _.uniqBy(originData, 'yearMonth').map(({ yearMonth }) => yearMonth);

  originData.forEach(({ cpp, percentOfSales, yearMonth }) => {
    const xAixDataIdx = xAixData.indexOf(yearMonth);
    if (!data['cpp']) {
      data['cpp'] = Array(xAixData.length);
    }
    if (!data['percentOfSales']) {
      data['percentOfSales'] = Array(xAixData.length);
    }
    data['cpp'][xAixDataIdx] = cpp;
    data['percentOfSales'][xAixDataIdx] = percentOfSales?.toFixed(1);
  });
  const result = chartData.map(({ name, type, key }) => ({
    name,
    type,
    data: data[key],
  }));
  return {
    xAixData: xAixData.map((yearMonth) => {
      const year = yearMonth.substr(2, 2);
      const month = yearMonth.substr(-2);
      return `${year}년 ${month}월`;
    }),
    data: result,
  };
};

const chartData = [
  {
    name: 'CPP(원)',
    type: 'bar' as const,
    key: 'cpp',
    axisLabel: {
      formatter: '{value}',
    },
    nameTextStyle: {
      align: 'right' as const,
    },
    yAisName: '[단위: 원]',
  },
  {
    name: '매출 비중(%)',
    type: 'line' as const,
    key: 'percentOfSales',
    axisLabel: {
      formatter: '{value}',
    },
    nameTextStyle: {
      align: 'center' as const,
    },
    yAisName: '[단위: %]',
    max: (data) => Math.round(Math.max(...data.map((d) => (d ? Number(d) : 0))) * 2),
  },
];

const MarketingEfficiency = ({ data: originData }: IMarketingEfficiencyProps) => {
  const { xAixData, data } = makeChartData(originData?.marketingEfficiencyByMonths || []);

  const cppCompare = useMemo(
    () => originData?.marketingEfficiencyCompares?.find(({ title }) => title === 'cpp'),
    [originData?.marketingEfficiencyCompares],
  );
  const pltCompare = useMemo(
    () => originData?.marketingEfficiencyCompares?.find(({ title }) => title === 'plt'),
    [originData?.marketingEfficiencyCompares],
  );
  return (
    <Card flex={1}>
      <CardTitle>마케팅비 효율</CardTitle>
      <ContentWrap>
        <Content>
          <ContentTitle>{`CPP`}</ContentTitle>
          {originData?.marketingEfficiency?.cpp ? (
            <DataCardWrap>
              <div>
                <Cost
                  title={'전체'}
                  value={`₩ ${Number(
                    originData?.marketingEfficiency.cpp,
                  ).toLocaleString()}`}
                />
                {originData?.marketingEfficiencyByProductGroups.length ? (
                  <Cost
                    title={'선택한 제품군'}
                    value={`₩ ${Number(
                      originData?.marketingEfficiencyByProductGroups[0]?.cpp,
                    ).toLocaleString()}`}
                  />
                ) : null}
                {originData?.marketingEfficiencyByProducts.length ? (
                  <Cost
                    title={'선택한 제품'}
                    value={`₩ ${Number(
                      originData?.marketingEfficiencyByProducts[0]?.cpp,
                    ).toLocaleString()}`}
                  />
                ) : null}
              </div>
              <DiffWrap>
                <div>
                  <DiffInfo title={'전월 比'} value={cppCompare?.mom} />
                  <DiffInfo title={'전년 동월 比'} value={pltCompare?.yoy} />
                </div>
              </DiffWrap>
            </DataCardWrap>
          ) : (
            <EmptyContent />
          )}
        </Content>

        <Content>
          <ContentTitle>PLT매출 比 비중</ContentTitle>
          {originData?.marketingEfficiency?.percentOfSales ? (
            <DataCardWrap>
              <div>
                <Cost
                  title={'전체'}
                  value={`${Number(
                    originData?.marketingEfficiency.percentOfSales,
                  ).toLocaleString()}%p`}
                />
                {originData?.marketingEfficiencyByProductGroups.length ? (
                  <Cost
                    title={'선택한 제품군'}
                    value={`${Number(
                      originData?.marketingEfficiencyByProductGroups[0]?.percentOfSales,
                    ).toLocaleString()} %p`}
                  />
                ) : null}
                {originData?.marketingEfficiencyByProducts.length ? (
                  <Cost
                    title={'선택한 제품'}
                    value={`${Number(
                      originData?.marketingEfficiencyByProducts[0]?.percentOfSales,
                    ).toLocaleString()} %p`}
                  />
                ) : null}
              </div>
              <DiffWrap>
                <div>
                  <DiffInfo title={'전월 比'} value={pltCompare?.mom} unit={'%p'} />
                  <DiffInfo title={'전년 동월 比'} value={pltCompare?.yoy} unit={'%p'} />
                </div>
              </DiffWrap>
            </DataCardWrap>
          ) : (
            <EmptyContent />
          )}
        </Content>

        <Content flex={3}>
          <ChartWrap>
            <MixedChart
              grid={gridOption}
              yAxis={chartData.map(
                ({ name, axisLabel, yAisName, nameTextStyle, max }) => ({
                  type: 'value',
                  name: yAisName,
                  axisLabel,
                  nameTextStyle,
                  max: max
                    ? max(data.find((d) => d.name === name)?.data ?? [])
                    : undefined,
                  splitNumber: SPLIT_NUMBER,
                }),
              )}
              legend={{
                data: chartData.map(({ name }) => name),
              }}
              showLegendBottom={false}
              useYAxis
              useTooltip
              data={data}
              xAixData={xAixData}
            />
          </ChartWrap>
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default MarketingEfficiency;
