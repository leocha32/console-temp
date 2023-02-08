import React from 'react';
import { ChartOrient, ChartPosition, ChartTop, IBarChartProps } from 'mi-ui/src';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { TMonthlyAccountStatusRow } from '$modules/report/accountSales';
import { familySector } from '$recoils/categories';
import { useRecoilValue } from 'recoil';
import { BarChart } from '$components/Charts';

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
  data: TMonthlyAccountStatusRow[];
};

const makeChartData = (data: any[], orderStandard) => {
  if (data.length <= 0) return { chartData: [], xAixData: [], yAxis: [] };
  const legends = new Set(data.map(({ legend }) => legend));

  const sortLegends = Array.from(legends).sort((a, b) => {
    const indexA = orderStandard.indexOf(a);
    const indexB = orderStandard.indexOf(b);
    return indexA - indexB;
  });

  const xData = [...new Set(data.map(({ yearMonth }) => yearMonth))];

  const summary = xData.map((yearMonth) => {
    return data
      .filter((data) => data.yearMonth === yearMonth)
      .reduce((a, b) => {
        return { ...b, count: a.count + b.count };
      });
  });

  const maxValue = Math.max(...summary.map((o) => o.count));

  const chartData = sortLegends.map((legend) => {
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
      labelLayout: {
        hideOverlap: true,
      },
      markPoint: {
        label: {
          show: true,
          fontWeight: 'bold',
          fontSize: '15px',
          verticalAlign: 'top',
          position: 'top',
        },
        data: summary.map((sum, i) => {
          return {
            name: i + '',
            value: sum.count.toLocaleString('kr-KR'),
            coord: [i, maxValue],
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
      min: 0,
      axisLabel: {
        showMaxLabel: false,
      },
      scale: true,
    },
  } as {
    chartData: IBarChartProps['data'];
    xAixData: IBarChartProps['xAixData'];
    yAxis: IBarChartProps['yAxis'];
  };
};

const legendClickEvent = ({ selected }: any, chart) => {
  const selectedLegend = Object.keys(selected).filter((select) => selected[select]);
  const { series, xAxis } = chart.getOption();
  const selectedData = series.filter(({ name }) =>
    selectedLegend.find((select) => select === name),
  );
  const xAxisData = xAxis[0].data;
  const markPointData = xAxisData.map((x, i) => {
    const value = selectedData.map(({ data }) => data[i] || 0).reduce((a, b) => a + b, 0);
    return {
      coord: [i, value],
      value: value.toLocaleString('kr-KR'),
    };
  });

  chart.setOption({
    ...chart.getOption(),
    series: series.map((s) => {
      return {
        ...s,
        markPoint: {
          ...s.markPoint,
          data: markPointData,
        },
      };
    }),
  });
};

const Chart = ({ data }: TAccountChartProps) => {
  const familyOptions = useRecoilValue(familySector({ category: '제품' }));
  const orderStandard = familyOptions.map(({ value }) => value);
  const { chartData, xAixData, yAxis } = makeChartData(data, orderStandard);

  return (
    <Card flex={2}>
      <CardTitle>계정 수</CardTitle>
      <BarChart
        grid={gridOption}
        legend={legendOption}
        data={chartData}
        xAixData={xAixData}
        yAxis={yAxis}
        useAccumulate
        legendClickEvent={legendClickEvent}
      />
    </Card>
  );
};
export const AccountChart = React.memo(Chart);
