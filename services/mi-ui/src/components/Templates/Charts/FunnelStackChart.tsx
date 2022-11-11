import React, { useMemo } from 'react';
import { BaseEChart, IBaseEChartsProps, BACKGROUND_COLOR } from './BaseEChart';
import {
  TitleOption,
  LegendOption,
  BarSeriesOption,
  TooltipOption,
  GridOption,
} from 'echarts/types/dist/shared';
import { BarChart as EBarChart, CustomChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { ChartOrient, ChartType, ChartLeft } from '../../../constants/enum';

use([EBarChart, CustomChart]);

interface IDataProps {
  data: number[];
  stack: string;
  name?: string;
}

export interface IFunnelStackChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: IDataProps[];
  xAixData: string[];
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

const makeFunnel = (data, xAixDataLength) => {
  return {
    type: 'custom' as const,
    renderItem: function ({ coordSys, seriesIndex }, api) {
      const currentSeriesIndices = api.currentSeriesIndices();

      const barLayout = api.barLayout({
        barCategoryGap: '60%',
        count: seriesIndex,
      });
      const points: [number, number][] = [];

      const barWidth = barLayout[0].width;
      for (let i = 0; i < xAixDataLength; i++) {
        const sum = currentSeriesIndices.reduce((pre, cur, idx) => {
          if (idx === currentSeriesIndices.length - 1) {
            return pre;
          }
          const value = api.value(i, cur);
          return value + pre;
        }, 0);

        const point = api.coord([i, sum]);
        // 우측 상단 포인트
        points.splice(points.length, 0, [point[0] - barWidth, point[1]]);
        //x축 중심에서 우측 끝으로 이동
        point[0] += Math.round(barWidth);

        //좌측 상단 포인트
        points.push([point[0], point[1]]);

        //좌측 하단 포인트
        points.unshift([point[0], coordSys.height + coordSys.y]);
      }

      return {
        type: 'polygon' as const,
        shape: {
          points: points,
        },
        style: {
          stroke: '#d8d5d5',
          fill: '#d8d5d5',
          opacity: 0.3,
        },
      };
    },
    data: data,
    z: 0,
  };
};
export const FunnelStackChart = ({
  data,
  useTooltip = true,
  useFocus = true,
  useLegend = true,
  useLabel = true,
  title,
  tooltip,
  grid,
  legend,
  xAixData,
  label,
  ...props
}: IFunnelStackChartProps) => {
  const option = useMemo(() => {
    const series = data.map((d, index) => ({
      ...d,
      type: ChartType.BAR as BarSeriesOption['type'],
      color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length],
      label: {
        show: useLabel,
        ...label,
      },
      barCategoryGap: '60%',
      emphasis: {
        focus: useFocus ? ('series' as const) : ('none' as const),
      },
    }));
    return {
      title,
      grid,
      animation: false,
      tooltip: {
        trigger: useTooltip ? 'axis' : 'none',
        ...tooltip,
      },
      legend: {
        show: useLegend,
        orient: ChartOrient.HORIZONTAL,
        left: ChartLeft.CENTER,
        ...legend,
      },
      xAxis: {
        type: 'category' as const,
        data: xAixData,
      },
      yAxis: {
        type: 'value' as const,
      },
      series: [
        ...series,
        makeFunnel(
          data.map((d) => d.data),
          xAixData.length,
        ),
      ],
    };
  }, [
    data,
    grid,
    label,
    legend,
    title,
    tooltip,
    useFocus,
    useLabel,
    useLegend,
    useTooltip,
    xAixData,
  ]);
  return <BaseEChart {...props} option={option} />;
};
