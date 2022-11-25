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
import { LineChart as ELineChart, BarChart as EBarChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { ChartPosition } from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';
use([ELineChart, EBarChart]);
export const MixedChart = (_a) => {
    var { data, xAixData, yAxis, title, tooltip, useTooltip = true, useFocus = false, useLegend = true, useLabel = true, useYAxis = false, showLegendBottom = false, legend, label, grid } = _a, props = __rest(_a, ["data", "xAixData", "yAxis", "title", "tooltip", "useTooltip", "useFocus", "useLegend", "useLabel", "useYAxis", "showLegendBottom", "legend", "label", "grid"]);
    const option = useMemo(() => {
        const series = data.map((d, index) => (Object.assign(Object.assign({}, d), { barMaxWidth: 80, type: d.type, color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length], label: Object.assign({ position: ChartPosition.TOP, show: useLabel, formatter: ({ value }) => {
                    return value.toLocaleString('ko-KR');
                } }, label), yAxisIndex: index, emphasis: {
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
            yAxis: yAxis === null || yAxis === void 0 ? void 0 : yAxis.map((y) => {
                return Object.assign(Object.assign({}, y), { show: useYAxis, min: 0, alignTicks: true });
            }),
            legend: Object.assign({ show: useLegend, bottom: showLegendBottom || '90%' }, legend),
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
        yAxis,
        showLegendBottom,
        useYAxis,
    ]);
    return data.some(({ data }) => data === null || data === void 0 ? void 0 : data.length) ? (_jsx(BaseEChart, Object.assign({}, props, { option: option }))) : (_jsx(EmptyContent, {}));
};
