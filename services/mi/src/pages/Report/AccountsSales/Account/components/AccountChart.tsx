import React from 'react';
import { ChartOrient, ChartPosition, ChartTop, IBarChartProps } from 'mi-ui/src';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { IMonthlyAccountStatusRow } from '$modules/report/accountSales';
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
  data: IMonthlyAccountStatusRow[];
};

const makeChartData = (data: IMonthlyAccountStatusRow[], orderStandard) => {
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
        data: summary.map((sum, i) => {
          return {
            name: i + '',
            value: sum.count.toLocaleString('kr-KR'),
            coord: [i, maxValue * 0.03 + maxValue],
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
        legendClickEvent={(e) => {
          console.log(e);
          return e;
        }}
      />
    </Card>
  );
};
export const AccountChart = React.memo(Chart);

// import React from 'react';
// import {
//   ChartOrient,
//   IBarChartProps,
//   IStackBarChartProps,
//   ChartTop,
//   ChartPosition,
// } from 'mi-ui/src';
// import { CardTitle, Card } from '$pages/Report/commonStyled';
// import { IMonthlyAccountStatusRow } from '$modules/report/accountSales';
// import { familySector } from '$recoils/categories';
// import { useRecoilValue } from 'recoil';
// import { StackChart } from '$components/Charts';
//
// const legendOption = {
//   orient: ChartOrient.HORIZONTAL,
//   top: ChartTop.TOP,
//   padding: [5, 0, 10, 0],
// };
// const gridOption = {
//   left: '5%',
//   right: '0',
//   top: '13%',
//   bottom: '10%',
// };
//
// export type TAccountChartProps = {
//   data: IMonthlyAccountStatusRow[];
// };
//
// const makeChartData = (data: IMonthlyAccountStatusRow[], orderStandard) => {
//   if (data.length <= 0) return { chartData: [], xAixData: [], yAxis: [] };
//   const legends = new Set(data.map(({ legend }) => legend));
//
//   const sortLegends = Array.from(legends).sort((a, b) => {
//     const indexA = orderStandard.indexOf(a);
//     const indexB = orderStandard.indexOf(b);
//     return indexA - indexB;
//   });
//
//   const xData = [...new Set(data.map(({ yearMonth }) => yearMonth))];
//
//   const chartData = sortLegends.map((legend, i) => {
//     const legendData = data.filter((data) => data.legend === legend);
//     const per = legendData.map((data) => data.rate);
//
//     return {
//       name: legend,
//       stack: 'total',
//       data: legendData.map((data) => data.count),
//     };
//   });
//   const seriesOption = {
//     labelLayout: {
//       hideOverlap: true,
//     },
//     label: {
//       show: true,
//       position: ChartPosition.INSIDE,
//       formatter: (params) => {
//         const rate = data.find(
//           (data) => data.legend === params.seriesName && data.yearMonth === params.name,
//         )?.rate;
//         return `${params.value.toLocaleString('ko-KR')} (${rate}%)`;
//       },
//     },
//   };
//   // const chartData = sortLegends.map((legend, i) => {
//   //   const legendData = data.filter((data) => data.legend === legend);
//   //   return {
//   //     name: legend,
//   //     type: 'bar',
//   //     stack: 'total',
//   //     label: {
//   //       show: true,
//   //       position: ChartPosition.INSIDE,
//   //       formatter: ({ value, dataIndex }) => {
//   //         const per = legendData.map((data) => data.rate);
//   //         return `${value.toLocaleString('ko-KR')} (${per[dataIndex]}%)`;
//   //       },
//   //     },
//   //     labelLayout: {
//   //       hideOverlap: true,
//   //     },
//   //     data: legendData.map((data) => data.count),
//   //     emphasis: {
//   //       focus: 'series',
//   //     },
//   //     markPoint: {
//   //       data: summary.map((sum, i) => {
//   //         return {
//   //           name: i + '',
//   //           value: sum.count.toLocaleString('kr-KR'),
//   //           coord: [i, maxValue * 0.06 + maxValue],
//   //         };
//   //       }),
//   //       itemStyle: {
//   //         color: 'none',
//   //       },
//   //       symbol: 'rect',
//   //     },
//   //   };
//   // });
//
//   return {
//     chartData,
//     seriesOption,
//     xAixData: Array.from(xData),
//   };
// };
//
// const Chart = ({ data }: TAccountChartProps) => {
//   const familyOptions = useRecoilValue(familySector({ category: '제품' }));
//   const orderStandard = familyOptions.map(({ value }) => value);
//
//   const { chartData, xAixData, seriesOption } = makeChartData(data, orderStandard);
//
//   return (
//     <Card flex={2}>
//       <CardTitle>계정 수</CardTitle>
//       <StackChart
//         grid={gridOption}
//         legend={legendOption}
//         data={chartData}
//         xAixData={xAixData}
//         seriesOption={seriesOption}
//         accumulate={{
//           show: true,
//           options: {
//             formatter: ({ value }) =>
//               value.toLocaleString('ko-KR')
//             ,
//           },
//         }}
//         useFocus
//         useLegend
//       />
//     </Card>
//   );
// };
// export const AccountChart = React.memo(Chart);
