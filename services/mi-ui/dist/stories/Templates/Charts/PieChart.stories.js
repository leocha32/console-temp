import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { PieChart as CPieChart } from 'components/Templates';
import styled from '@emotion/styled';
export default {
    title: 'Templates/Charts',
    component: CPieChart,
};
const ChartWrap = styled.div `
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 10px;
`;
export const PieChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CPieChart, Object.assign({}, props)) }));
};
PieChart.args = {
    data: {
        data: [
            { value: 39, name: '코웨이' },
            { value: 26, name: '삼성전자' },
            { value: 17, name: 'LG전자' },
            { value: 12, name: '청호' },
            { value: 5, name: 'SK매직' },
        ],
        label: {
            formatter: '{c}%',
        },
    },
    tooltip: { valueFormatter: (value) => `${value}%` },
};
