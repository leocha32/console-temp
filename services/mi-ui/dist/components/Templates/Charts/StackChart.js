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
import { ChartOrient, ChartType, ChartLeft, ChartPosition, } from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';
use([EBarChart]);
const getTotalData = (items) => {
    return items.reduce((pre, { data }) => {
        return data.map((v, dataIndex) => { var _a; return v + ((_a = pre[dataIndex]) !== null && _a !== void 0 ? _a : 0); });
    }, []);
};
export const StackChart = (_a) => {
    var { data, useTooltip = true, useFocus = true, useAccumulate = false, useLegend = true, useLabel = true, title, tooltip, grid, legend, xAixData, seriesOption, yAxis } = _a, props = __rest(_a, ["data", "useTooltip", "useFocus", "useAccumulate", "useLegend", "useLabel", "title", "tooltip", "grid", "legend", "xAixData", "seriesOption", "yAxis"]);
    const option = useMemo(() => {
        const series = data.map((d, index) => (Object.assign(Object.assign(Object.assign({}, d), { type: ChartType.BAR, color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length], label: Object.assign({ show: useLabel }, seriesOption === null || seriesOption === void 0 ? void 0 : seriesOption.label), emphasis: {
                focus: useFocus ? 'series' : 'none',
            }, barMaxWidth: 80 }), seriesOption)));
        if (useAccumulate) {
            const total = getTotalData(data);
            series.push({
                data: total,
                barGap: '-100%',
                barMaxWidth: 80,
                stack: '',
                z: -1,
                color: 'transparent',
                type: ChartType.BAR,
                tooltip: {
                    show: false,
                },
                label: Object.assign(Object.assign({ show: useLabel, position: ChartPosition.TOP }, seriesOption === null || seriesOption === void 0 ? void 0 : seriesOption.label), { fontSize: 16, color: '#bbbaba' }),
            });
        }
        return {
            title,
            grid,
            tooltip: Object.assign({ trigger: useTooltip ? 'axis' : 'none' }, tooltip),
            legend: Object.assign({ show: useLegend, orient: ChartOrient.HORIZONTAL, left: ChartLeft.CENTER, selectedMode: !useAccumulate, itemHeight: 10, itemWidth: 12 }, legend),
            xAxis: {
                type: 'category',
                data: xAixData,
            },
            yAxis: Object.assign({ type: 'value' }, yAxis),
            series,
        };
    }, [
        data,
        seriesOption,
        tooltip,
        grid,
        legend,
        title,
        useFocus,
        useLegend,
        useLabel,
        useTooltip,
        xAixData,
        yAxis,
        useAccumulate,
    ]);
    return data.length ? _jsx(BaseEChart, Object.assign({}, props, { option: option })) : _jsx(EmptyContent, {});
};
