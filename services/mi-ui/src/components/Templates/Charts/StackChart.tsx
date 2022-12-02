import React, { useMemo } from 'react';
import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
import {
  TitleOption,
  LegendOption,
  BarSeriesOption,
  TooltipOption,
  GridOption,
  YAXisOption,
} from 'echarts/types/dist/shared';

import { BarChart as EBarChart } from 'echarts/charts';
import { use } from 'echarts/core';
import {
  ChartOrient,
  ChartType,
  ChartLeft,
  ChartPosition,
} from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';

use([EBarChart]);

interface IDataProps {
  data: number[];
  stack: string;
  name?: string;
}
export interface IStackBarChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: IDataProps[];
  xAixData: string[];
  useAccumulate?: boolean;
  useTooltip?: boolean;
  useLabel?: boolean;
  useLegend?: boolean;
  useFocus?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  seriesOption?: BarSeriesOption;
  grid?: GridOption;
  yAxis?: YAXisOption;
}

const getTotalData = (items: IDataProps[]) => {
  return items.reduce<number[]>((pre, { data }) => {
    return data.map((v, dataIndex) => v + (pre[dataIndex] ?? 0));
  }, []);
};

export const StackChart = ({
  data,
  useTooltip = true,
  useFocus = true,
  useAccumulate = false,
  useLegend = true,
  useLabel = true,
  title,
  tooltip,
  grid,
  legend,
  xAixData,
  seriesOption,
  yAxis,
  ...props
}: IStackBarChartProps) => {
  const option = useMemo(() => {
    const series: any = data.map((d, index) => ({
      ...d,
      type: ChartType.BAR as BarSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      label: {
        show: useLabel,
        ...seriesOption?.label,
      },
      emphasis: {
        focus: useFocus ? ('series' as const) : ('none' as const),
      },
      barMaxWidth: 80,
      ...seriesOption,
    }));
    if (useAccumulate) {
      const total = getTotalData(data);
      series.push({
        data: total,
        barGap: '-100%',
        barMaxWidth: 80,
        stack: '',
        z: -1,
        color: 'transparent',
        type: ChartType.BAR as BarSeriesOption['type'],
        tooltip: {
          show: false,
        },
        label: {
          show: useLabel,
          position: ChartPosition.TOP,
          ...seriesOption?.label,
          fontSize: 16,
          color: '#bbbaba',
        },
      });
    }
    return {
      title,
      grid,
      tooltip: {
        trigger: useTooltip ? 'axis' : 'none',
        ...tooltip,
      },
      legend: {
        show: useLegend,
        orient: ChartOrient.HORIZONTAL,
        left: ChartLeft.CENTER,
        selectedMode: !useAccumulate,
        itemHeight: 10,
        itemWidth: 12,
        ...legend,
      },
      xAxis: {
        type: 'category' as const,
        data: xAixData,
      },
      yAxis: {
        type: 'value' as const,
        ...yAxis,
      },
      series,
    };
  }, [
    data,
    seriesOption,
    tooltip,
    grid,
    legend,
    title,
    useFocus,
    useLegend,
    useLabel,
    useTooltip,
    xAixData,
    yAxis,
    useAccumulate,
  ]);
  return data.length ? <BaseEChart {...props} option={option} /> : <EmptyContent />;
};
// import React, { useMemo } from 'react';
// import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
// import {
//   TitleOption,
//   LegendOption,
//   BarSeriesOption,
//   TooltipOption,
//   GridOption,
//   YAXisOption,
// } from 'echarts/types/dist/shared';
//
// import { BarChart as EBarChart } from 'echarts/charts';
// import { use } from 'echarts/core';
// import {
//   ChartOrient,
//   ChartType,
//   ChartLeft,
//   ChartPosition,
// } from '../../../constants/enum';
// import { EmptyContent } from '../EmptyContent';
//
// use([EBarChart]);
//
// interface IDataProps {
//   data: number[];
//   stack: string;
//   name?: string;
// }
// export interface IStackBarChartProps extends Omit<IBaseEChartsProps, 'option'> {
//   data: IDataProps[];
//   xAixData: string[];
//   accumulate?: {
//     show: boolean;
//     options?: BarSeriesOption['label'];
//   };
//   useTooltip?: boolean;
//   useLabel?: boolean;
//   useLegend?: boolean;
//   useFocus?: boolean;
//   tooltip?: TooltipOption;
//   title?: TitleOption;
//   legend?: LegendOption;
//   seriesOption?: BarSeriesOption;
//   grid?: GridOption;
//   yAxis?: YAXisOption;
// }
//
// const getTotalData = (items: IDataProps[]) => {
//   return items.reduce<number[]>((pre, { data }) => {
//     return data.map((v, dataIndex) => v + (pre[dataIndex] ?? 0));
//   }, []);
// };
//
// export const StackChart = ({
//                              data,
//                              useTooltip = true,
//                              useFocus = true,
//                              accumulate = { show: false },
//                              useLegend = true,
//                              useLabel = true,
//                              title,
//                              tooltip,
//                              grid,
//                              legend,
//                              xAixData,
//                              seriesOption,
//                              yAxis,
//                              ...props
//                            }: IStackBarChartProps) => {
//   const option = useMemo(() => {
//     const series: any = data.map((d, index) => ({
//       ...d,
//       type: ChartType.BAR as BarSeriesOption['type'],
//       color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
//       label: {
//         show: useLabel,
//         ...seriesOption?.label,
//       },
//       emphasis: {
//         focus: useFocus ? ('series' as const) : ('none' as const),
//       },
//       labelLayout: { hideOverlap: true },
//       barMaxWidth: 80,
//       ...seriesOption,
//     }));
//     if (accumulate.show) {
//       const total = getTotalData(data);
//       series.push({
//         data: total,
//         barGap: '-100%',
//         barMaxWidth: 80,
//         stack: '',
//         z: -1,
//         color: 'transparent',
//         type: ChartType.BAR as BarSeriesOption['type'],
//         tooltip: {
//           show: false,
//         },
//         label: {
//           show: useLabel,
//           position: ChartPosition.TOP,
//           fontSize: 16,
//           color: '#bbbaba',
//           ...accumulate.options,
//         },
//       });
//     }
//     return {
//       title,
//       grid,
//       tooltip: {
//         trigger: useTooltip ? 'axis' : 'none',
//         ...tooltip,
//       },
//       legend: {
//         show: useLegend,
//         orient: ChartOrient.HORIZONTAL,
//         left: ChartLeft.CENTER,
//         // selectedMode: !accumulate.show,
//         itemHeight: 10,
//         itemWidth: 12,
//         ...legend,
//       },
//       xAxis: {
//         type: 'category' as const,
//         data: xAixData,
//       },
//       yAxis: {
//         type: 'value' as const,
//         ...yAxis,
//       },
//       series,
//     };
//   }, [
//     data,
//     seriesOption,
//     tooltip,
//     grid,
//     legend,
//     title,
//     useFocus,
//     useLegend,
//     useLabel,
//     useTooltip,
//     xAixData,
//     yAxis,
//     accumulate,
//   ]);
//   return data.length ? <BaseEChart {...props} option={option} /> : <EmptyContent />;
// };
