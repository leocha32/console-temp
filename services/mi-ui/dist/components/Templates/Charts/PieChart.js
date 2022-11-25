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
import { use } from 'echarts/core';
import { PieChart as EPieChart } from 'echarts/charts';
import { ChartOrient, ChartLeft } from '../../../constants/enum';
import { EmptyContent } from '../EmptyContent';
use([EPieChart]);
export const PieChart = (_a) => {
    var _b;
    var { data, title, tooltip, useLegend = true, useTooltip = true, useFocus = true, useLabel = true, legend, grid } = _a, props = __rest(_a, ["data", "title", "tooltip", "useLegend", "useTooltip", "useFocus", "useLabel", "legend", "grid"]);
    const option = useMemo(() => {
        const { label, labelLine, emphasis } = data, d = __rest(data, ["label", "labelLine", "emphasis"]);
        return {
            title,
            grid,
            tooltip: Object.assign({ trigger: useTooltip ? 'item' : 'none' }, tooltip),
            legend: Object.assign({ show: useLegend, orient: ChartOrient.HORIZONTAL, left: ChartLeft.CENTER, itemHeight: 10, itemWidth: 12 }, legend),
            series: [
                Object.assign({ type: 'pie', emphasis: Object.assign({ focus: useFocus ? 'self' : 'none' }, emphasis), radius: '50%', color: BACKGROUND_COLOR, label: Object.assign({ show: useLabel }, label), labelLine: Object.assign({ show: true }, labelLine) }, d),
            ],
        };
    }, [data, legend, grid, useFocus, useLegend, useLabel, title, tooltip, useTooltip]);
    return ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length) ? (_jsx(BaseEChart, Object.assign({}, props, { option: option }))) : (_jsx(EmptyContent, {}));
};
