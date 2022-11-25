import { IBaseEChartsProps } from './BaseEChart';
import { TitleOption, LegendOption, BarSeriesOption, TooltipOption, GridOption, YAXisOption } from 'echarts/types/dist/shared';
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
    seriesOption?: BarSeriesOption;
    grid?: GridOption;
    yAxis?: YAXisOption;
}
export declare const StackChart: ({ data, useTooltip, useFocus, useAccumulate, useLegend, useLabel, title, tooltip, grid, legend, xAixData, seriesOption, yAxis, ...props }: IStackBarChartProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=StackChart.d.ts.map