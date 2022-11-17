import React, { useMemo } from 'react';
import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
import { use } from 'echarts/core';
import { PieChart as EPieChart } from 'echarts/charts';
import {
  TitleOption,
  LegendOption,
  PieSeriesOption,
  TooltipOption,
  GridOption,
} from 'echarts/types/dist/shared';
import { ChartOrient, ChartLeft } from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';
use([EPieChart]);

export interface IPieChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: PieSeriesOption;
  useTooltip?: boolean;
  useFocus?: boolean;
  useLegend?: boolean;
  useLabel?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  grid?: GridOption;
}

export const PieChart = ({
  data,
  title,
  tooltip,
  useLegend = true,
  useTooltip = true,
  useFocus = true,
  useLabel = true,
  legend,
  grid,
  ...props
}: IPieChartProps) => {
  const option = useMemo(() => {
    const { label, labelLine, emphasis, ...d } = data;
    return {
      title,
      grid,
      tooltip: {
        trigger: useTooltip ? 'item' : 'none',
        ...tooltip,
      },
      legend: {
        show: useLegend,
        orient: ChartOrient.HORIZONTAL,
        left: ChartLeft.CENTER,
        itemHeight: 10,
        itemWidth: 12,
        ...legend,
      },
      series: [
        {
          type: 'pie' as const,
          emphasis: {
            focus: useFocus ? ('self' as const) : ('none' as const),
            ...emphasis,
          },
          radius: '50%',
          color: BACKGROUND_COLOR,
          label: {
            show: useLabel,
            ...label,
          },
          labelLine: {
            show: true,
            ...labelLine,
          },
          ...d,
        },
      ],
    };
  }, [data, legend, grid, useFocus, useLegend, useLabel, title, tooltip, useTooltip]);
  return data?.data?.length ? (
    <BaseEChart {...props} option={option} />
  ) : (
    <EmptyContent />
  );
};
