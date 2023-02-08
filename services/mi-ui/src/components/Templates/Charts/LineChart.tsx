import React, { useMemo } from 'react';
import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
import {
  TitleOption,
  LegendOption,
  LineSeriesOption,
  TooltipOption,
  GridOption,
} from 'echarts/types/dist/shared';

import { LineChart as ELineChart } from 'echarts/charts';
import { use } from 'echarts/core';
import {
  ChartOrient,
  ChartPosition,
  ChartType,
  ChartLeft,
} from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';

use([ELineChart]);

export interface ILineChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: LineSeriesOption[];
  xAixData: string[];
  useTooltip?: boolean;
  useLabel?: boolean;
  useFocus?: boolean;
  useLegend?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  grid?: GridOption;
}

export const LineChart = ({
  data,
  xAixData,
  title,
  tooltip,
  useTooltip = true,
  useFocus = true,
  useLegend = true,
  useLabel = true,
  legend,
  grid,
  ...props
}: ILineChartProps) => {
  const option = useMemo(() => {
    const series = data.map((d, index) => ({
      ...d,
      type: ChartType.LINE as LineSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      label: {
        position: ChartPosition.TOP,
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
        ...legend,
      },
      yAxis: {
        type: 'value' as const,
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
  ]);
  return data.length ? <BaseEChart {...props} option={option} /> : <EmptyContent />;
};
