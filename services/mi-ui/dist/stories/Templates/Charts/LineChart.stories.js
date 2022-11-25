import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { LineChart as CLineChart } from 'components/Templates';
import styled from '@emotion/styled';
export default {
    title: 'Templates/Charts',
    component: CLineChart,
};
const ChartWrap = styled.div `
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;
export const LineChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CLineChart, Object.assign({}, props)) }));
};
LineChart.args = {
    data: [
        {
            name: '지상파',
            data: [20, 20, 30, 15, 45, 50, 10, 5, 70, 62, 43, 22],
        },
        {
            name: 'jtbc',
            data: [10, 13, 21, 39, 28, 43, 69, 3, 20, 33, 32, 42],
        },
        {
            name: 'tvn',
            data: [3, 27, 12, 31, 18, 42, 29, 13, 2, 31, 39, 12],
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
