import React from 'react';
import {
  BarChart,
  ChartOrient,
  ChartPosition,
  ChartTop,
  IBarChartProps,
} from 'mi-ui/src';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { IMonthlyAccountStatusRow } from '$modules/report/accountSales';

const legendOption = {
  orient: ChartOrient.HORIZONTAL,
  top: ChartTop.TOP,
  padding: [5, 0, 10, 0],
};
const gridOption = {
  left: '5%',
  right: '0',
  top: '13%',
  bottom: '10%',
};

export type TAccountChartProps = {
  data: IMonthlyAccountStatusRow[];
};

const makeChartData = (data: IMonthlyAccountStatusRow[]) => {
  if (data.length <= 0) return { chartData: [], xAixData: [], yAxis: [] };
  const legends = new Set(data.map(({ legend }) => legend));

  const xData = [...new Set(data.map(({ yearMonth }) => yearMonth))];

  const summary = xData.map((yearMonth) => {
    return data
      .filter((data) => data.yearMonth === yearMonth)
      .reduce((a, b) => {
        return { ...b, count: a.count + b.count };
      });
  });

  const maxValue = Math.max(...summary.map((o) => o.count));

  const chartData = Array.from(legends).map((legend) => {
    const legendData = data.filter((data) => data.legend === legend);

    return {
      name: legend,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: ChartPosition.INSIDE,
        formatter: ({ value, dataIndex }) => {
          const per = legendData.map((data) => data.rate);
          return `${value.toLocaleString('ko-KR')} (${per[dataIndex]}%)`;
        },
      },
      data: legendData.map((data) => data.count),
      emphasis: {
        focus: 'series',
      },
      markPoint: {
        data: summary.map((sum, i) => {
          return {
            name: i + '',
            value: sum.count.toLocaleString('kr-KR'),
            coord: [i, maxValue * 0.15 + maxValue],
          };
        }),
        itemStyle: {
          color: 'none',
        },
        symbol: 'rect',
      },
    };
  });

  return {
    chartData,
    xAixData: xData.map(
      (yearMonth) => `${yearMonth.slice(2, 4)}년 ${yearMonth.slice(4)}월`,
    ),
    yAxis: {
      type: 'value',
      max: maxValue * 0.2 + maxValue,
      axisLabel: {
        showMaxLabel: false,
      },
    },
  } as {
    chartData: IBarChartProps['data'];
    xAixData: IBarChartProps['xAixData'];
    yAxis: IBarChartProps['yAxis'];
  };
};

export const AccountChart = ({ data }: TAccountChartProps) => {
  const { chartData, xAixData, yAxis } = makeChartData(data);

  return (
    <Card height={350}>
      <CardTitle>계정 수</CardTitle>
      <BarChart
        grid={gridOption}
        legend={legendOption}
        data={chartData}
        xAixData={xAixData}
        yAxis={yAxis}
        useAccumulate
      />
    </Card>
  );
};
