import React from 'react';
import { IMarketShareByBrand } from 'modules/MarketConditions';
import _ from 'lodash';
import { IStackBarChartProps, StackChart } from 'mi-ui';
import { ChartLeft, ChartOrient, ChartTop } from 'mi-ui/src/constants/enum';
import { ChartWrap, ChartWrapTitle, ContentWrap, Wrap } from './commonStyled';

export interface IMarketShareByBrandProps {
  data: IMarketShareByBrand[];
}

const makeChartData = (
  data: IMarketShareByBrand[],
): {
  xAixData: string[];
  volumeData: IStackBarChartProps['data'];
  valueData: IStackBarChartProps['data'];
} => {
  const volumeData = {};
  const valueData = {};
  const xAixData = _.uniqBy(data, 'year').map(({ year }) => year);

  data.forEach(({ brand, year, marketShareBySalesValue, marketShareBySalesVolume }) => {
    const xAixDataIdx = xAixData.indexOf(year);
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
    volumeData[brand].data[xAixDataIdx] = marketShareBySalesVolume;
    valueData[brand].data[xAixDataIdx] = marketShareBySalesValue;
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
  height: '75%',
};
const yAxisOption = {
  name: '[단위: %]',
};
export const MarketShareByBrand = ({ data }: IMarketShareByBrandProps) => {
  const { xAixData, valueData, volumeData } = makeChartData(data);

  return (
    <Wrap>
      <ContentWrap>
        <ChartWrapTitle>판매량 기준</ChartWrapTitle>
        <ChartWrap>
          <StackChart
            data={volumeData}
            xAixData={xAixData}
            legend={legendOption}
            grid={gridOption}
            yAxis={yAxisOption}
          />
        </ChartWrap>
      </ContentWrap>
      <ContentWrap>
        <ChartWrapTitle>매출액 기준</ChartWrapTitle>
        <ChartWrap>
          <StackChart
            data={valueData}
            xAixData={xAixData}
            legend={legendOption}
            grid={gridOption}
            yAxis={yAxisOption}
          />
        </ChartWrap>
      </ContentWrap>
    </Wrap>
  );
};
