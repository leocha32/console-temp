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
import { ChartOrient, ChartType, ChartLeft } from '../../../constants/enum';
use([EPieChart]);

interface IDataProps {
  value: number;
  name: string;
}
export interface IPieChartProps extends Omit<IBaseEChartsProps, 'option'> {
  name?: string;
  data: IDataProps[];
  useTooltip?: boolean;
  useFocus?: boolean;
  useLegend?: boolean;
  useLabel?: boolean;
  tooltip?: TooltipOption;
  title?: TitleOption;
  legend?: LegendOption;
  label?: PieSeriesOption['label'];
  grid?: GridOption;
}

export const PieChart = ({
  name,
  data,
  title,
  tooltip,
  useLegend = true,
  useTooltip = true,
  useFocus = true,
  useLabel = true,
  legend,
  label,
  grid,
  ...props
}: IPieChartProps) => {
  const option = useMemo(() => {
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
        ...legend,
      },
      series: [
        {
          label: {
            alignTo: 'edge' as const,
            formatter: '{c}',
            minMargin: 5,
            lineHeight: 15,
            show: useLabel,
            ...label,
          },
          emphasis: {
            focus: useFocus ? ('self' as const) : ('none' as const),
          },
          color: BACKGROUND_COLOR,
          type: ChartType.PIE as PieSeriesOption['type'],
          radius: '50%',
          data,
          name,
        },
      ],
    };
  }, [
    data,
    label,
    legend,
    grid,
    useFocus,
    useLegend,
    useLabel,
    name,
    title,
    tooltip,
    useTooltip,
  ]);
  return <BaseEChart {...props} option={option} />;
};
