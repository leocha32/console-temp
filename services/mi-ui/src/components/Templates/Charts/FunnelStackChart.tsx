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
import { cloneDeep } from 'lodash';

use([EBarChart, CustomChart]);

interface IDataProps {
  data: number[];
  stack: string;
  name?: string;
}

export interface IFunnelStackChartProps extends Omit<IBaseEChartsProps, 'option'> {
  data: IDataProps[];
  diffData?: number[];
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

const RECT_WIDTH = 70;
const RECT_HEIGHT = 40;
const markRender = [
  {
    type: 'rect',
    shape: {
      width: RECT_WIDTH,
      height: RECT_HEIGHT,
    },
    y: 0,
    x: 0,
    z: 0,
    style: {
      fill: '#a2a2a2',
      stroke: '#676565',
      lineWidth: 1,
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: 'rgba(0,0,0,0.1)',
    },
  },
  {
    type: 'text' as const,
    y: 0,
    x: 0,
    z: 0,
    left: 'center' as const,
    top: 'middle' as const,
    style: {
      fill: 'rgba(0, 0, 0, 0.87)',
      width: 220,
      overflow: 'break' as const,
      text: '',
      font: '22px Microsoft YaHei',
    },
  },
];
const makeFunnel = (data, xAixDataLength, diffData) => {
  return {
    type: 'custom' as const,
    renderItem: function ({ coordSys, seriesIndex }, api) {
      const currentSeriesIndices = api.currentSeriesIndices();

      const barLayout = api.barLayout({
        barCategoryGap: '69%',
        count: seriesIndex,
      });
      const points: [number, number][] = [];
      const renderPoints: number[] = [];
      const renderItem: any = [];

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
        renderPoints.push(point[1]);
        // 우측 상단 포인트
        points.splice(points.length, 0, [point[0] - barWidth, point[1]]);
        //x축 중심에서 우측 끝으로 이동
        point[0] += barWidth;

        //좌측 상단 포인트
        points.push([point[0], point[1]]);

        //좌측 하단 포인트
        points.unshift([point[0], coordSys.height + coordSys.y]);
      }
      if (diffData.length) {
        barLayout.forEach((bar, index) => {
          if (diffData[index] <= 0) return;

          const [rect, text] = cloneDeep(markRender);
          rect.x = bar.bandWidth * (index + 1) + Math.abs(bar.offsetCenter) + bar.width;
          rect.y = (renderPoints[index] + renderPoints[index + 1]) / 2;
          text.x = rect.x + RECT_WIDTH / 4;
          text.y = rect.y + RECT_HEIGHT / 4;
          text.style.text = `${diffData[index]}%`;
          renderItem.push(text);
        });
      }

      return {
        type: 'group' as const,
        children: [
          {
            type: 'polygon' as const,
            shape: {
              points: points,
            },
            style: {
              stroke: '#d8d5d5',
              fill: '#d8d5d5',
              opacity: 0.3,
            },
          },
          ...renderItem,
        ],
      };
    },
    data: data,
    z: 0,
  };
};
export const FunnelStackChart = ({
  data,
  diffData = [],
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
      barCategoryGap: '70%',
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
          diffData,
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
