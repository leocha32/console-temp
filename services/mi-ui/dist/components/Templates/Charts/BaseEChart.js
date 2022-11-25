import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useRef, useEffect } from 'react';
import { CanvasRenderer } from 'echarts/renderers';
import { init, getInstanceByDom, use } from 'echarts/core';
import { LegendComponent, GridComponent, TooltipComponent, ToolboxComponent, TitleComponent, DataZoomComponent, MarkPointComponent, } from 'echarts/components';
import { ChartColor } from 'constants/color';
// Register the required components
use([
    LegendComponent,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    MarkPointComponent,
    ToolboxComponent,
    DataZoomComponent,
    CanvasRenderer, // 캔버스 렌더링 모드에만 사용.
]);
export const BACKGROUND_COLOR = Object.values(ChartColor);
export function BaseEChart({ option, settings, loading, theme, style, }) {
    const chartRef = useRef(null);
    useEffect(() => {
        // Initialize chart
        let chart;
        if (chartRef.current !== null) {
            chart = init(chartRef.current, theme);
        }
        // Add chart resize listener
        // ResizeObserver is leading to a bit janky UX
        function resizeChart() {
            chart === null || chart === void 0 ? void 0 : chart.resize();
        }
        window.addEventListener('resize', resizeChart);
        // Return cleanup function
        return () => {
            chart === null || chart === void 0 ? void 0 : chart.dispose();
            window.removeEventListener('resize', resizeChart);
        };
    }, [theme]);
    useEffect(() => {
        // Update chart
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            chart === null || chart === void 0 ? void 0 : chart.setOption(option, Object.assign(Object.assign({}, settings), { notMerge: true }));
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
            loading === true ? chart === null || chart === void 0 ? void 0 : chart.showLoading() : chart === null || chart === void 0 ? void 0 : chart.hideLoading();
        }
    }, [loading, theme]);
    return _jsx("div", { ref: chartRef, style: Object.assign({ height: '100%' }, style) });
}
