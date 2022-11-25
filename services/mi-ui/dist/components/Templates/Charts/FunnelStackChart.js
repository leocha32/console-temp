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
import { BarChart as EBarChart, CustomChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { ChartOrient, ChartType, ChartLeft } from '../../../constants/enum';
use([EBarChart, CustomChart]);
const makeFunnel = (data, xAixDataLength) => {
    return {
        type: 'custom',
        renderItem: function ({ coordSys, seriesIndex }, api) {
            const currentSeriesIndices = api.currentSeriesIndices();
            const barLayout = api.barLayout({
                barCategoryGap: '60%',
                count: seriesIndex,
            });
            const points = [];
            const barWidth = barLayout[0].width;
            for (let i = 0; i < xAixDataLength; i++) {
                const sum = currentSeriesIndices.reduce((pre, cur, idx) => {
                    if (idx === currentSeriesIndices.length - 1) {
                        return pre;
                    }
                    const value = api.value(i, cur);
                    return value + pre;
                }, 0);
                const point = api.coord([i, sum]);
                // 우측 상단 포인트
                points.splice(points.length, 0, [point[0] - barWidth, point[1]]);
                //x축 중심에서 우측 끝으로 이동
                point[0] += Math.round(barWidth);
                //좌측 상단 포인트
                points.push([point[0], point[1]]);
                //좌측 하단 포인트
                points.unshift([point[0], coordSys.height + coordSys.y]);
            }
            return {
                type: 'polygon',
                shape: {
                    points: points,
                },
                style: {
                    stroke: '#d8d5d5',
                    fill: '#d8d5d5',
                    opacity: 0.3,
                },
            };
        },
        data: data,
        z: 0,
    };
};
export const FunnelStackChart = (_a) => {
    var { data, useTooltip = true, useFocus = true, useLegend = true, useLabel = true, title, tooltip, grid, legend, xAixData, label } = _a, props = __rest(_a, ["data", "useTooltip", "useFocus", "useLegend", "useLabel", "title", "tooltip", "grid", "legend", "xAixData", "label"]);
    const option = useMemo(() => {
        const series = data.map((d, index) => (Object.assign(Object.assign({}, d), { type: ChartType.BAR, color: BACKGROUND_COLOR[index % BACKGROUND_COLOR.length], label: Object.assign({ show: useLabel }, label), barCategoryGap: '60%', emphasis: {
                focus: useFocus ? 'series' : 'none',
            } })));
        return {
            title,
            grid,
            animation: false,
            tooltip: Object.assign({ trigger: useTooltip ? 'axis' : 'none' }, tooltip),
            legend: Object.assign({ show: useLegend, orient: ChartOrient.HORIZONTAL, left: ChartLeft.CENTER }, legend),
            xAxis: {
                type: 'category',
                data: xAixData,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                ...series,
                makeFunnel(data.map((d) => d.data), xAixData.length),
            ],
        };
    }, [
        data,
        grid,
        label,
        legend,
        title,
        tooltip,
        useFocus,
        useLabel,
        useLegend,
        useTooltip,
        xAixData,
    ]);
    return _jsx(BaseEChart, Object.assign({}, props, { option: option }));
};
