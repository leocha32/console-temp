var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useMemo } from 'react';
import { BaseEChart, BACKGROUND_COLOR } from './BaseEChart';
import { LineChart as ELineChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { ChartOrient, ChartPosition, ChartType, ChartLeft, } from '../../../constants/enum';
use([ELineChart]);
export const LineChart = (_a) => {
    var { data, xAixData, title, tooltip, useTooltip = true, useFocus = true, useLegend = true, useLabel = true, legend, label, grid } = _a, props = __rest(_a, ["data", "xAixData", "title", "tooltip", "useTooltip", "useFocus", "useLegend", "useLabel", "legend", "label", "grid"]);
    const option = useMemo(() => {
        const series = data.map((d, index) => (Object.assign(Object.assign({}, d), { type: ChartType.LINE, color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length], label: Object.assign({ position: ChartPosition.TOP, show: useLabel }, label), emphasis: {
                focus: useFocus ? 'series' : 'none',
            } })));
        return {
            title,
            grid,
            tooltip: Object.assign({ trigger: useTooltip ? 'axis' : 'none' }, tooltip),
            xAxis: {
                type: 'category',
                data: xAixData,
            },
            legend: Object.assign({ show: useLegend, orient: ChartOrient.HORIZONTAL, left: ChartLeft.CENTER }, legend),
            yAxis: {
                type: 'value',
            },
            series,
        };
    }, [
        data,
        label,
        legend,
        grid,
        useFocus,
        title,
        tooltip,
        useLegend,
        useLabel,
        useTooltip,
        xAixData,
    ]);
    return _jsx(BaseEChart, Object.assign({}, props, { option: option }));
};
