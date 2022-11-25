import { CSSProperties } from 'react';
import type { ComposeOption, SetOptionOpts } from 'echarts/core';
import type { BarSeriesOption, LineSeriesOption, ScatterSeriesOption, CustomSeriesOption, PieSeriesOption } from 'echarts/charts';
import type { TitleComponentOption, MarkPointComponentOption, GridComponentOption } from 'echarts/components';
export declare type TBaseEChartsOption = ComposeOption<BarSeriesOption | LineSeriesOption | TitleComponentOption | GridComponentOption | ScatterSeriesOption | PieSeriesOption | CustomSeriesOption | MarkPointComponentOption>;
export interface IBaseEChartsProps {
    option: TBaseEChartsOption;
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: 'light' | 'dark';
}
export declare const BACKGROUND_COLOR: ("#5082ff" | "#32d3d0" | "#0091cb" | "#044957" | "#ff5b5b" | "#25a75f" | "#eb9954" | "#dd0060" | "#9332d3" | "#9bd460" | "#FF61E1" | "#FFCB00" | "#9F8367" | "#B398FF" | "#DC5043" | "#0D00B0" | "#7FBCBB" | "#8995AE" | "#50E0FF" | "#614092")[];
export declare function BaseEChart({ option, settings, loading, theme, style, }: IBaseEChartsProps): JSX.Element;
//# sourceMappingURL=BaseEChart.d.ts.map