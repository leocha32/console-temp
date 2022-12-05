import React, {
  Ref,
  forwardRef,
  useState,
  useRef,
  useEffect,
  CSSProperties,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
} from 'react';
import * as echarts from 'echarts';

import { CanvasRenderer } from 'echarts/renderers';
import { getInstanceByDom, use, EChartsType } from 'echarts/core';
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
  legendClickEvent?: (e: object, chart: typeof echarts) => void;
}
export const BACKGROUND_COLOR = Object.values(ChartColor);

const removeUndefined = (obj: object) => {
  for (const key in obj) {
    if (obj[key as keyof typeof obj] === undefined) {
      delete obj[key as keyof typeof obj];
    }
  }
  return obj;
};

const BaseEChart = forwardRef(
  (
    {
      option,
      settings,
      loading,
      theme,
      style,
      resize,
      legendClickEvent = (e, chart) => null,
    }: IBaseEChartsProps,
    ref: Ref<echarts.ECharts | undefined>,
  ): JSX.Element => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [echartsInstance, setEchartsInstance] = useState<echarts.ECharts>();

    const addEvent = function (chart) {
      chart.on('legendselectchanged', (e) => {
        legendClickEvent(e, chart);
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

    useLayoutEffect(() => {
      const instance = echarts.init(chartRef.current as HTMLDivElement);
      setEchartsInstance(instance);
      addEvent(instance);
      return () => {
        instance.dispose();
      };
    }, []);

    useEffect(() => {
      const handleResize = () => {
        echartsInstance?.resize();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [echartsInstance]);

    useEffect(() => {
      echartsInstance?.setOption(option);
    }, [echartsInstance, option]);

    useImperativeHandle(ref, () => echartsInstance);

    const obj = useMemo(() => {
      return removeUndefined({ option, style });
    }, [option, style]);

    return <div ref={chartRef} style={{ height: '100%', width: '100%' }} {...obj} />;
  },
);
BaseEChart.displayName = 'chart';
export { BaseEChart };
