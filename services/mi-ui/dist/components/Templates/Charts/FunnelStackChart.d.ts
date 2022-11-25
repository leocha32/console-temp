import { IBaseEChartsProps } from './BaseEChart';
import { TitleOption, LegendOption, BarSeriesOption, TooltipOption, GridOption } from 'echarts/types/dist/shared';
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
export declare const FunnelStackChart: ({ data, useTooltip, useFocus, useLegend, useLabel, title, tooltip, grid, legend, xAixData, label, ...props }: IFunnelStackChartProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FunnelStackChart.d.ts.map