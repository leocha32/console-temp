import { IBaseEChartsProps } from './BaseEChart';
import { TitleOption, LegendOption, LineSeriesOption, TooltipOption, GridOption } from 'echarts/types/dist/shared';
interface IDataProps {
    data: number[];
    name?: string;
}
export interface ILineChartProps extends Omit<IBaseEChartsProps, 'option'> {
    data: IDataProps[];
    xAixData: string[];
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
export declare const LineChart: ({ data, xAixData, title, tooltip, useTooltip, useFocus, useLegend, useLabel, legend, label, grid, ...props }: ILineChartProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LineChart.d.ts.map