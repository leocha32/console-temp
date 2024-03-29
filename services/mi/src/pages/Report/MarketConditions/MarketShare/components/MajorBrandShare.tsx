import React from 'react';
import { uniqBy } from 'lodash';
import { TMajorBrandMarketShare } from '$modules/report/research';
import { IStackChartProps, ChartOrient, ChartLeft, ChartTop } from 'mi-ui';
import { CardTitle, Card, ContentWrap, Content } from '$pages/Report/commonStyled';
import { StackChart } from '$components/Charts';
export interface IMajorBrandShareProps {
  data: TMajorBrandMarketShare[];
}

const makeChartData = (
  data: TMajorBrandMarketShare[],
): {
  xAixData: string[];
  volumeData: IStackChartProps['data'];
  valueData: IStackChartProps['data'];
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
  left: '10%',
  top: '10%',
  right: '10',
};
const yAxisOption = {
  max: 100,
  name: '[단위: %]',
};

export const MajorBrandShare = ({ data }: IMajorBrandShareProps) => {
  const { xAixData, volumeData } = makeChartData(data);
  return (
    <Card>
      <CardTitle>주요 브랜드 시장 점유율(Top 10위)</CardTitle>
      <ContentWrap>
        <Content>
          <StackChart
            data={volumeData}
            xAixData={xAixData}
            legend={legendOption}
            grid={gridOption}
            yAxis={yAxisOption}
          />
        </Content>
      </ContentWrap>
    </Card>
  );
};
