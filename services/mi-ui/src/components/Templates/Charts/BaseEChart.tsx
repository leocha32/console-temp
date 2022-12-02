import React, { useRef, useEffect, CSSProperties, useMemo } from 'react';
import * as echarts from 'echarts';

import { CanvasRenderer } from 'echarts/renderers';
import { getInstanceByDom, use } from 'echarts/core';
import {
  LegendComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  DataZoomComponent,
  MarkPointComponent,
} from 'echarts/components';
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core';
import type {
  BarSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
  CustomSeriesOption,
  PieSeriesOption,
} from 'echarts/charts';
import type {
  TitleComponentOption,
  MarkPointComponentOption,
  GridComponentOption,
} from 'echarts/components';
import { ChartColor } from 'constants/color';

// Register the required components
use([
  LegendComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  MarkPointComponent,
  ToolboxComponent, // 내보내기, 데이터보기 등 유틸리티 도구.
  DataZoomComponent, // Line 차트에 사용
  CanvasRenderer, // 캔버스 렌더링 모드에만 사용.
]);

// Combine an Option type with only required components and charts via ComposeOption
export type TBaseEChartsOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | ScatterSeriesOption
  | PieSeriesOption
  | CustomSeriesOption
  | MarkPointComponentOption
>;

export interface IBaseEChartsProps {
  option: TBaseEChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  resize?: boolean;
  legendClickEvent?: (e: object) => object;
}
export const BACKGROUND_COLOR = Object.values(ChartColor);

export function BaseEChart({
  option,
  settings,
  loading,
  theme,
  style,
  resize,
  legendClickEvent = (e: object) => e,
}: IBaseEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  const addEvent = (chart) => {
    chart.on('legendselectchanged', (e) => {
      legendClickEvent(e || {});
    });
  };

  useMemo(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      setTimeout(() => {
        chart?.resize({
          animation: {
            duration: 300,
          },
        });
      }, 300);
    }
  }, [resize]);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;

    if (chartRef.current !== null) {
      const chart = echarts.init(chartRef.current, theme);
      addEvent(chart);
      // chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX

    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener('resizeChart', resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resizeChart', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.dispose();
      const initChart = echarts.init(chartRef.current, theme);
      getInstanceByDom(chartRef.current)?.setOption(option);
      addEvent(initChart);
    }
    /**
     * Whenever theme changes we need to add option
     * and setting due to it being deleted in cleanup function
     */
  }, [option, settings, theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ height: '100%', ...style }} />;
}
