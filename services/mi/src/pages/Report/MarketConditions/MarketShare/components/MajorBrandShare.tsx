import React from 'react';
import { uniqBy } from 'lodash';
import { IMajorBrandMarketShare } from '$modules/report/marketConditions/marketShare';
import { IStackBarChartProps, StackChart, ChartOrient, ChartLeft, ChartTop } from 'mi-ui';
import styled from '@emotion/styled';
import { CardTitle } from '$pages/Report/commonStyled';
import { Card as MiCard } from 'mi-ui/src';

const Card = styled(MiCard)`
  display: grid;
  grid-template-rows: min-content;
  grid-column: 2/3;
  grid-row: 1/3;
  background-color: #fafafa;
  padding: 20px;
`;

export interface IMajorBrandShareProps {
  data: IMajorBrandMarketShare[];
}

const makeChartData = (
  data: IMajorBrandMarketShare[],
): {
  xAixData: string[];
  volumeData: IStackBarChartProps['data'];
  valueData: IStackBarChartProps['data'];
} => {
  const volumeData = {};
  const valueData = {};
  const addQuarterData = data.map((dt) => {
    return {
      ...dt,
      quarter: `${dt.year}년 ${dt.half === '1' ? '상반기' : '하반기'}`,
    };
  });
  const xAixData = uniqBy(addQuarterData, 'quarter').map(({ quarter }) => quarter);

  addQuarterData.forEach(({ brand, quarter, marketShareValue }) => {
    const xAixDataIdx = xAixData.indexOf(quarter);
    if (!volumeData[brand]) {
      volumeData[brand] = {
        name: brand,
        stack: 'brand',
        data: Array(xAixData.length),
      };
    }
    if (!valueData[brand]) {
      valueData[brand] = {
        name: brand,
        stack: 'brand',
        data: Array(xAixData.length),
      };
    }
    volumeData[brand].data[xAixDataIdx] = marketShareValue;
    valueData[brand].data[xAixDataIdx] = marketShareValue;
  });
  return {
    xAixData,
    volumeData: Object.values(volumeData),
    valueData: Object.values(valueData),
  };
};

const legendOption = {
  orient: ChartOrient.HORIZONTAL,
  left: ChartLeft.CENTER,
  top: ChartTop.BOTTOM,
  padding: 10,
};
const gridOption = {
  left: '15%',
  top: '10%',
};
const yAxisOption = {
  max: 100,
};

export const MajorBrandShare = ({ data }: IMajorBrandShareProps) => {
  const { xAixData, volumeData } = makeChartData(data);
  return (
    <Card>
      <CardTitle>주요 브랜드 시장 점유율(Top 10위)</CardTitle>
      <StackChart
        data={volumeData}
        xAixData={xAixData}
        legend={legendOption}
        grid={gridOption}
        yAxis={yAxisOption}
      />
    </Card>
  );
};
