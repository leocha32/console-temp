import { IBaseEChartsProps } from './BaseEChart';
import { TitleOption, LegendOption, PieSeriesOption, TooltipOption, GridOption } from 'echarts/types/dist/shared';
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
export declare const PieChart: ({ data, title, tooltip, useLegend, useTooltip, useFocus, useLabel, legend, grid, ...props }: IPieChartProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PieChart.d.ts.map