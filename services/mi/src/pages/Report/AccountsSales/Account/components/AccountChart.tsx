import React from 'react';
import { BarChart, ChartOrient, ChartPosition, ChartTop } from 'mi-ui/src';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { IMonthlyAccountStatusRow } from '$modules/report/accountSales';
const legendOption = {
  orient: ChartOrient.HORIZONTAL,
  top: ChartTop.TOP,
  padding: [5, 0, 10, 0],
};
const gridOption = {
  left: '0%',
  top: '13%',
  bottom: '10%',
};

export type TAccountChartProps = {
  data: IMonthlyAccountStatusRow[];
};

export const AccountChart = ({ data }: TAccountChartProps) => {
  const legends = new Set(data.map(({ legend }) => legend));
  const xAixData = [...new Set(data.map(({ yearMonth }) => yearMonth))];
  const chartData: any[] = [];
  const summary = xAixData.map((yearMonth) => {
    return data
      .filter((data) => data.yearMonth === yearMonth)
      .reduce((a, b) => {
        return { ...b, legend: '', count: a.count + b.count };
      });
  });

  legends.forEach((legend) => {
    const legendData = data.filter((data) => data.legend === legend);
    const obj = {
      name: legend,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: ChartPosition.INSIDE,
        formatter: ({ value, dataIndex }) => {
          const per = legendData.map((data) => data.rate);
          return `${value.toLocaleString('ko-kr')} (${per[dataIndex]}%)`;
        },
      },
      data: legendData.map((data) => data.count),
      emphasis: {
        focus: 'series',
      },
      markPoint: {
        data: [
          {
            type: 'max',
          },
        ],
        itemStyle: {
          color: 'none',
        },
        symbol: 'rect',
        label: {
          formatter: (params) => {
            return '';
            // return summary.find((sum) => sum.yearMonth === '');
            // return legendData.map((data) => data.count);
          },
        },
      },
    };
    chartData.push(obj);
  });

  return (
    <Card>
      <CardTitle>계정 수</CardTitle>
      <BarChart
        grid={gridOption}
        legend={legendOption}
        data={chartData}
        xAixData={xAixData.map((value) => `${value.slice(2, 4)}년 ${value.slice(4)}월`)}
        yAxis={[
          {
            type: 'value',
            name: 'total',
          },
          {
            type: 'value',
            name: 'Temperature',
          },
        ]}
      />
    </Card>
  );
};
