import React, { useMemo } from 'react';
import { IMarketSpread } from 'modules/MarketConditions';
import { IBarChartProps, BarChart } from 'mi-ui';
import {
  Wrap,
  ChartWrap,
  ChartWrapTitle,
  ChartWrapInfo,
  ContentWrap,
} from './commonStyled';
import styled from '@emotion/styled';

export interface IMarketSpreadProps {
  data: IMarketSpread[];
  year: string;
}

const makeChartData = (
  data: IMarketSpread[],
): {
  volumeData: IBarChartProps['data'];
  valueData: IBarChartProps['data'];
} => {
  const volumeData: IBarChartProps['data'] = [];
  const valueData: IBarChartProps['data'] = [];

  data.forEach(
    ({ annualSalesVolume, annualSalesValue, salesVolumeYoy, salesValueYoy }) => {
      valueData.push({
        data: [salesValueYoy, annualSalesValue],
      });
      volumeData.push({
        data: [salesVolumeYoy, annualSalesVolume],
      });
    },
  );
  return {
    volumeData: Object.values(volumeData),
    valueData: Object.values(valueData),
  };
};
const gridOption = {
  left: '15%',
};
const legendOption = {
  show: false,
};
const ChartInfo = ({ data = [], xAixData = [], value }: { data; xAixData; value }) => {
  return data.length && xAixData.length > 1 ? (
    <ChartWrapInfo>
      <span>{`전년 대비 ${Math.abs(value)} `}</span>
      <DiffBox value={value}>▼</DiffBox>
    </ChartWrapInfo>
  ) : null;
};

const DiffBox = styled.div`
  transform: ${({ value }: { value: number }) => (value > 0 ? 'rotate(180deg)' : 'none')};
  color: ${({ value }: { value: number }) => (value > 0 ? 'red' : 'blue')};
  margin-left: 5px;
`;
export const MarketSpread = ({ data, year }: IMarketSpreadProps) => {
  const xAixData = useMemo(() => {
    const xAix = [year];
    if (data[0]?.salesValueYoy) {
      xAix.unshift((Number(year) - 1).toString());
    }
    return xAix;
  }, [year, data]);
  const { valueData, volumeData } = makeChartData(data);

  const salesVolumeYoyDiff = data[0]?.salesVolumeYoyDiff;
  const salesValueYoyDiff = data[0]?.salesValueYoyDiff;
  return (
    <Wrap>
      <ContentWrap>
        <ChartWrapTitle>연간 판매량</ChartWrapTitle>
        <ChartInfo value={salesVolumeYoyDiff} data={volumeData} xAixData={xAixData} />
        <ChartWrap>
          <BarChart
            data={volumeData}
            xAixData={xAixData}
            grid={gridOption}
            legend={legendOption}
            yAxis={{
              name: '[단위: 천 대]',
            }}
          />
        </ChartWrap>
      </ContentWrap>
      <ContentWrap>
        <ChartWrapTitle>연간 매출액</ChartWrapTitle>
        <ChartInfo value={salesValueYoyDiff} data={valueData} xAixData={xAixData} />
        <ChartWrap>
          <BarChart
            data={valueData}
            xAixData={xAixData}
            legend={legendOption}
            grid={gridOption}
            yAxis={{
              name: '[단위: 억 원]',
            }}
          />
        </ChartWrap>
      </ContentWrap>
    </Wrap>
  );
};
