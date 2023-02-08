import React, { useMemo } from 'react';
import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
import {
  TitleOption,
  LegendOption,
  LineSeriesOption,
  BarSeriesOption,
  TooltipOption,
  GridOption,
  YAXisOption,
} from 'echarts/types/dist/shared';

import { LineChart as ELineChart, BarChart as EBarChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { ChartPosition } from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';

use([ELineChart, EBarChart]);

interface IDataProps {
  data: number[];
  type: LineSeriesOption['type'] | BarSeriesOption['type'];
  name?: string;
}
type TMixedChartProps = Omit<IBaseEChartsProps, 'option'>;

export interface IMixedChartProps extends TMixedChartProps {
  data: IDataProps[];
  // option: LineSeriesOption | BarSeriesOption;
  xAixData: string[];
  yAxis?: YAXisOption[];
  showLegendBottom?: boolean;
  useYAxis?: boolean;
  useTooltip?: boolean;
  useLabel?: boolean;
  useFocus?: boolean;
  useLegend?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  label?: LineSeriesOption['label'];
  grid?: GridOption;
}

export const MixedChart = ({
  data,
  xAixData,
  yAxis,
  title,
  tooltip,
  useTooltip = true,
  useFocus = false,
  useLegend = true,
  useLabel = true,
  useYAxis = false,
  showLegendBottom = false,
  legend,
  label,
  grid,
  ...props
}: IMixedChartProps) => {
  const option = useMemo(() => {
    const series = data.map((d, index) => ({
      ...d,
      barMaxWidth: 80,
      type: d.type as BarSeriesOption['type'] & LineSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      label: {
        position: ChartPosition.TOP,
        show: useLabel,
        formatter: ({ value }) => {
          return value.toLocaleString('ko-KR');
        },
        ...label,
      },
      yAxisIndex: index,
      emphasis: {
        focus: useFocus ? ('series' as const) : ('none' as const),
      },
      labelLayout: {
        hideOverlap: true,
      },
    }));

    return {
      title,
      grid,
      tooltip: {
        trigger: useTooltip ? 'axis' : 'none',
        ...tooltip,
      },
      xAxis: {
        type: 'category' as const,
        data: xAixData,
      },
      yAxis: yAxis?.map((y) => {
        return {
          ...y,
          show: useYAxis,
          min: 0,
          alignTicks: true,
        };
      }),
      legend: {
        show: useLegend,
        bottom: showLegendBottom || '90%',
        ...legend,
      },
      series,
    };
  }, [
    data,
    label,
    legend,
    grid,
    useFocus,
    title,
    tooltip,
    useLegend,
    useLabel,
    useTooltip,
    xAixData,
    yAxis,
    showLegendBottom,
    useYAxis,
  ]);
  return data.some(({ data }) => data?.length) ? (
    <BaseEChart {...props} option={option} />
  ) : (
    <EmptyContent />
  );
};
