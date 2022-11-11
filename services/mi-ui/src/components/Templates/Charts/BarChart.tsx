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
import { EmptyContent } from '../EmptyContent';

use([EBarChart]);

export interface IBarChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: BarSeriesOption[];
  xAixData: string[];
  useAccumulate?: boolean;
  useTooltip?: boolean;
  useLabel?: boolean;
  useFocus?: boolean;
  useLegend?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  grid?: GridOption;
  yAxis?: YAXisOption | YAXisOption[];
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
  useAccumulate = false,
  legend,
  grid,
  yAxis,
  ...props
}: IBarChartProps) => {
  const option = useMemo(() => {
    const series = data.map((d, index) => ({
      barMaxWidth: 80,
      type: ChartType.BAR as BarSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      barGap: useAccumulate ? '-100%' : '0',
      ...d,
      label: {
        position: useAccumulate ? ChartPosition.INSIDE_TOP : ChartPosition.TOP,
        show: useLabel,
        ...d?.label,
      },
      emphasis: {
        focus: useFocus ? ('series' as const) : ('none' as const),
        ...d?.emphasis,
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
      legend: {
        show: useLegend,
        orient: ChartOrient.HORIZONTAL,
        left: ChartLeft.CENTER,
        itemHeight: 10,
        itemWidth: 12,
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
    useAccumulate,
  ]);
  return data.length ? <BaseEChart {...props} option={option} /> : <EmptyContent />;
};
