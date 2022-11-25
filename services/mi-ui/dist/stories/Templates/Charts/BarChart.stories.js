import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { BarChart as CBarChart } from 'components/Templates';
import styled from '@emotion/styled';
export default {
    title: 'Templates/Charts',
    component: CBarChart,
};
const ChartWrap = styled.div `
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 10px;
`;
export const BarChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CBarChart, Object.assign({}, props)) }));
};
BarChart.args = {
    data: [
        {
            name: '마케팅비 (억원)',
            data: [20, 20, 30, 15, 45, 50, 10, 5, 70, 62, 43, 22],
        },
    ],
    xAixData: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
    ],
};
export const MultiDataBarChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CBarChart, Object.assign({}, props)) }));
};
MultiDataBarChart.args = {
    data: [
        {
            name: '지상파',
            data: [20, 20, 30, 15, 45, 50, 10, 5, 70, 62, 43, 22],
        },
        {
            name: 'CATV',
            data: [10, 13, 21, 39, 28, 43, 69, 3, 20, 93, 32, 42],
        },
    ],
    xAixData: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
    ],
    useTooltip: true,
};
export const AccumulateBarChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CBarChart, Object.assign({}, props)) }));
};
AccumulateBarChart.args = {
    useAccumulate: true,
    data: [
        {
            name: '지상파',
            data: [20, 20, 30, 15, 45, 50, 10, 5, 70, 62, 43, 22],
        },
        {
            name: 'CATV',
            data: [10, 13, 21, 39, 28, 43, 69, 3, 20, 93, 32, 42],
        },
    ],
    xAixData: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
    ],
    useTooltip: true,
};
