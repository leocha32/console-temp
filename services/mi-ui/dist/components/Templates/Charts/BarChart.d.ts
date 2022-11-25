import { IBaseEChartsProps } from './BaseEChart';
import { TitleOption, LegendOption, BarSeriesOption, TooltipOption, GridOption, YAXisOption, MarkPointOption } from 'echarts/types/dist/shared';
export interface IBarChartProps extends Omit<IBaseEChartsProps, 'option'> {
    data: BarSeriesOption[];
    xAixData: string[];
    useAccumulate?: boolean;
    useTooltip?: boolean;
    useLabel?: boolean;
    useFocus?: boolean;
    useLegend?: boolean;
    tooltip?: TooltipOption;
    title?: TitleOption;
    legend?: LegendOption;
    grid?: GridOption;
    yAxis?: YAXisOption | YAXisOption[];
    markPoint?: MarkPointOption;
}
export declare const BarChart: ({ data, xAixData, title, tooltip, useTooltip, useFocus, useLegend, useLabel, useAccumulate, legend, grid, yAxis, ...props }: IBarChartProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BarChart.d.ts.map