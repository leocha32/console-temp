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
  ChartPosition,
  ChartType,
  ChartLeft,
} from '../../../constants/enum';
import { EmptyContent } from './EmptyContent';

use([EBarChart]);

interface IDataProps {
  data: number[];
  name?: string;
}
export interface IBarChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: IDataProps[];
  xAixData: string[];
  useTooltip?: boolean;
  useLabel?: boolean;
  useFocus?: boolean;
  useLegend?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  seriesOption?: BarSeriesOption;
  grid?: GridOption;
  yAxis?: YAXisOption;
}

export const BarChart = ({
  data,
  xAixData,
  title,
  tooltip,
  useTooltip = true,
  useFocus = true,
  useLegend = true,
  useLabel = true,
  legend,
  seriesOption,
  grid,
  yAxis,
  ...props
}: IBarChartProps) => {
  const option = useMemo(() => {
    const series = data.map((d, index) => ({
      ...d,
      type: ChartType.BAR as BarSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      label: {
        position: ChartPosition.TOP,
        show: useLabel,
        ...seriesOption?.label,
      },
      emphasis: {
        focus: useFocus ? ('series' as const) : ('none' as const),
      },
      barMaxWidth: 80,
      ...seriesOption,
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
      legend: {
        show: useLegend,
        orient: ChartOrient.HORIZONTAL,
        left: ChartLeft.CENTER,
        ...legend,
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
  ]);
  return data.length ? <BaseEChart {...props} option={option} /> : <EmptyContent />;
};
