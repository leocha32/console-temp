import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { IMarketSpread } from 'modules/report/research';
import { IBarChartProps, BarChart } from 'mi-ui';
import {
  ChartWrap,
  DiffBox,
  Card,
  CardTitle,
  ContentTitle,
  ContentWrap,
  Content,
} from '$pages/Report/commonStyled';

export interface IMarketSpreadProps {
  data: IMarketSpread[];
  year: string;
}

const ChartWrapInfo = styled.div`
  color: #8b8b8b;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  width: 100%;
  justify-content: center;
`;

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
      const valueDataArr: number[] = [];
      const volumeDataArr: number[] = [];
      if (salesValueYoy) {
        valueDataArr.push(salesValueYoy);
      }
      if (salesVolumeYoy) {
        volumeDataArr.push(salesVolumeYoy);
      }

      valueData.push({
        data: [...valueDataArr, annualSalesValue],
      });
      volumeData.push({
        data: [...volumeDataArr, annualSalesVolume],
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
  bottom: '5%',
};
const legendOption = {
  show: false,
};
const ChartInfo = ({ data = [], xAixData = [], value }: { data; xAixData; value }) => {
  return data.length && xAixData.length > 1 ? (
    <ChartWrapInfo>
      <span>{`전년 대비 ${Math.abs(value)}% `}</span>
      <DiffBox value={value}>▼</DiffBox>
    </ChartWrapInfo>
  ) : null;
};

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
    <Card>
      <CardTitle>시장 규모 (판매량 & 매출액)</CardTitle>
      <ContentWrap>
        <Content>
          <ContentTitle>연간 판매량</ContentTitle>
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
        </Content>
        <Content>
          <ContentTitle>연간 매출액</ContentTitle>
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
        </Content>
      </ContentWrap>
    </Card>
  );
};
