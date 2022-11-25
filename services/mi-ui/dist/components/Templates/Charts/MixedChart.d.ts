import { IBaseEChartsProps } from './BaseEChart';
import { TitleOption, LegendOption, LineSeriesOption, BarSeriesOption, TooltipOption, GridOption, YAXisOption } from 'echarts/types/dist/shared';
interface IDataProps {
    data: number[];
    type: LineSeriesOption['type'] | BarSeriesOption['type'];
    name?: string;
}
declare type TMixedChartProps = Omit<IBaseEChartsProps, 'option'>;
export interface IMixedChartProps extends TMixedChartProps {
    data: IDataProps[];
    xAixData: string[];
    yAxis?: YAXisOption[];
    showLegendBottom?: boolean;
    useYAxis?: boolean;
    useTooltip?: boolean;
    useLabel?: boolean;
    useFocus?: boolean;
    useLegend?: boolean;
    tooltip?: TooltipOption;
    title?: TitleOption;
    legend?: LegendOption;
    label?: LineSeriesOption['label'];
    grid?: GridOption;
}
export declare const MixedChart: ({ data, xAixData, yAxis, title, tooltip, useTooltip, useFocus, useLegend, useLabel, useYAxis, showLegendBottom, legend, label, grid, ...props }: IMixedChartProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MixedChart.d.ts.map