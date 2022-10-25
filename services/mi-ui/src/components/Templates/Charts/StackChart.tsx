import React, { useMemo } from 'react';
import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
import {
  TitleOption,
  LegendOption,
  BarSeriesOption,
  TooltipOption,
  GridOption,
} from 'echarts/types/dist/shared';

import { BarChart as EBarChart } from 'echarts/charts';
import { use } from 'echarts/core';
import {
  ChartOrient,
  ChartType,
  ChartLeft,
  ChartPosition,
} from '../../../constants/enum';

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
  label?: BarSeriesOption['label'];
  grid?: GridOption;
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
  label,
  ...props
}: IStackBarChartProps) => {
  const option = useMemo(() => {
    const series: any = data.map((d, index) => ({
      ...d,
      type: ChartType.BAR as BarSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      label: {
        show: useLabel,
        ...label,
      },
      emphasis: {
        focus: useFocus ? ('series' as const) : ('none' as const),
      },
    }));
    if (useAccumulate) {
      const total = getTotalData(data);
      series.push({
        data: total,
        barGap: '-100%',
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
          ...label,
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
        ...legend,
      },
      xAxis: {
        type: 'category' as const,
        data: xAixData,
      },
      yAxis: {
        type: 'value' as const,
      },
      series,
    };
  }, [
    data,
    label,
    tooltip,
    grid,
    legend,
    title,
    useFocus,
    useLegend,
    useLabel,
    useTooltip,
    xAixData,
    useAccumulate,
  ]);
  return <BaseEChart {...props} option={option} />;
};
