import React, { useMemo } from 'react';
import _ from 'lodash';
import { IMajorBrandAwareness } from '$modules/report/research';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
import { BarChart, ChartOrient, ChartTop } from 'mi-ui';
import {
  Card,
  ChartWrap,
  CardTitle,
  Content,
  ContentTitle,
  ContentWrap,
} from '$pages/Report/commonStyled';
export interface IMajorBrandAwarenessProps {
  data: IMajorBrandAwareness[];
}

const BACKGROUND_COLOR = ['#5082ff', '#43d2d0', '#276781'];

const makeChartData = (data: IMajorBrandAwareness[]) => {
  const items = {};
  const names = [
    { label: '보조', key: 'aidedAwareness' },
    { label: '비보조', key: 'unaidedAwareness' },
    { label: '최초', key: 'topOfMind' },
  ];
  const category = _.uniqBy(data, function (data) {
    return `${data.year}-${data.half}`;
  }).map(({ year, half }) => `${year}-${half}`);

  data.forEach(({ brand, year, half, ...item }) => {
    const xAixDataIdx = category.indexOf(`${year}-${half}`);
    if (!items[brand]) {
      items[brand] = names.map(({ label }) => ({
        name: label,
        data: Array(category.length),
      }));
    }
    names.forEach(({ key }, index) => {
      items[brand][index].data[xAixDataIdx] = item[key];
      items[brand][index].color = BACKGROUND_COLOR[index];
    });
  });
  return {
    items,
    xAixData: category.map((c) => {
      const [year, half] = c.split('-');
      return `${year.slice(2)}년 ${half}H`;
    }),
  };
};

const legendOption = {
  orient: ChartOrient.HORIZONTAL,
  top: ChartTop.BOTTOM,
  padding: [10, 0, 10, 0],
};
const gridOption = {
  left: '15%',
  top: '10%',
  bottom: '18%',
};
const yAxisOption = {
  max: 100,
};
export const MajorBrandAwareness = ({ data }: IMajorBrandAwarenessProps) => {
  const { items: chartData, xAixData } = makeChartData(data);
  const chardDataKeys = useMemo(() => {
    const keys = Object.keys(chartData);
    const cowayIndex = keys.findIndex((key) => key === '코웨이');
    return [
      keys[cowayIndex],
      ...keys.slice(0, cowayIndex),
      ...keys.slice(cowayIndex + 1, keys.length),
    ];
  }, [chartData]);

  return (
    <Card flex={1}>
      <CardTitle>주요 브랜드 인지도</CardTitle>
      {data?.length ? (
        <ContentWrap>
          {chardDataKeys.map((key) => (
            <Content key={key}>
              <ContentTitle>{key}</ContentTitle>
              <ChartWrap>
                <BarChart
                  grid={gridOption}
                  useAccumulate
                  data={chartData[key]}
                  xAixData={xAixData}
                  legend={legendOption}
                  yAxis={yAxisOption}
                />
              </ChartWrap>
            </Content>
          ))}
        </ContentWrap>
      ) : (
        <EmptyContent />
      )}
    </Card>
  );
};
