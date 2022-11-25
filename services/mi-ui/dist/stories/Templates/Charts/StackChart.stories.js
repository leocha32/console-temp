import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { StackChart as CStackChart } from 'components/Templates';
import styled from '@emotion/styled';
import { ChartLeft, ChartTop } from '../../../constants/enum';
export default {
    title: 'Templates/Charts',
    component: CStackChart,
};
const ChartWrap = styled.div `
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 10px;
`;
export const StackChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CStackChart, Object.assign({}, props)) }));
};
export const AccumulateStackChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CStackChart, Object.assign({}, props)) }));
};
AccumulateStackChart.args = {
    useAccumulate: true,
    title: {
        text: '코웨이',
        left: ChartLeft.CENTER,
        top: ChartTop.BOTTOM,
    },
    data: [
        {
            name: '보조',
            stack: 'total',
            data: [10, 23, 35],
        },
        {
            name: '비보조',
            stack: 'total',
            data: [25, 50, 17],
        },
        {
            name: '최초',
            stack: 'total',
            data: [34, 22, 12],
        },
    ],
    xAixData: ['20년', '21년', '22년 1H'],
};
StackChart.args = {
    data: [
        {
            name: '자사율',
            stack: 'total',
            data: [10, 23, 15, 36, 72, 31, 84, 53, 27, 31, 35, 0],
        },
        {
            name: '제품상담(5200)',
            stack: 'total',
            data: [20, 20, 30, 15, 45, 0, 10, 5, 70, 62, 43, 22],
        },
        {
            name: '커머스',
            stack: 'total',
            data: [0, 10, 7, 2, 34, 50, 81, 29, 75, 32, 43, 74],
        },
        {
            name: '쿠팡',
            stack: 'total',
            data: [94, 24, 73, 13, 3, 37, 53, 42, 13, 0, 32, 26],
        },
    ],
    useLabel: true,
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
