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
import { BarChart as EBarChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { ChartOrient, ChartPosition, ChartType, ChartLeft, } from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';
use([EBarChart]);
export const BarChart = (_a) => {
    var { data, xAixData, title, tooltip, useTooltip = true, useFocus = true, useLegend = true, useLabel = true, useAccumulate = false, legend, grid, yAxis } = _a, props = __rest(_a, ["data", "xAixData", "title", "tooltip", "useTooltip", "useFocus", "useLegend", "useLabel", "useAccumulate", "legend", "grid", "yAxis"]);
    const option = useMemo(() => {
        const series = data.map((d, index) => (Object.assign(Object.assign({ barMaxWidth: 80, type: ChartType.BAR, color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length], barGap: useAccumulate ? '-100%' : '0' }, d), { label: Object.assign({ position: useAccumulate ? ChartPosition.INSIDE_TOP : ChartPosition.TOP, show: useLabel }, d === null || d === void 0 ? void 0 : d.label), emphasis: Object.assign({ focus: useFocus ? 'series' : 'none' }, d === null || d === void 0 ? void 0 : d.emphasis) })));
        return {
            title,
            grid,
            tooltip: Object.assign({ trigger: useTooltip ? 'axis' : 'none' }, tooltip),
            xAxis: {
                type: 'category',
                data: xAixData,
            },
            legend: Object.assign({ show: useLegend, orient: ChartOrient.HORIZONTAL, left: ChartLeft.CENTER, itemHeight: 10, itemWidth: 12 }, legend),
            yAxis: Object.assign({ type: 'value' }, yAxis),
            series,
        };
    }, [
        data,
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
        useAccumulate,
    ]);
    return data.length ? _jsx(BaseEChart, Object.assign({}, props, { option: option })) : _jsx(EmptyContent, {});
};
