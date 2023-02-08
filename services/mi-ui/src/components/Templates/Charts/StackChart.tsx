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
export interface IStackChartProps extends Omit<IBaseEChartsProps, 'option'> {
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
  textFormat?: (value: number) => number | string;
}

const getTotalData = (
  items: IDataProps[],
  textFormat?: IStackChartProps['textFormat'],
) => {
  return items.reduce<unknown[]>(
    (pre, { data }) =>
      data.map((v, dataIndex) => {
        const value = Number(v);
        const total = (Number.isNaN(value) ? 0 : value) + Number(pre[dataIndex] ?? 0);
        return textFormat ? textFormat(total) : total;
      }),
    [],
  );
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
  textFormat,
  ...props
}: IStackChartProps) => {
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
      const total = getTotalData(data, textFormat);
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
    textFormat,
  ]);
  return data.length ? <BaseEChart {...props} option={option} /> : <EmptyContent />;
};
