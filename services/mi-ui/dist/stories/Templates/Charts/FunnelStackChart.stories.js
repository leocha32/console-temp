import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { FunnelStackChart as CFunnelStackChart, } from 'components/Templates';
import styled from '@emotion/styled';
export default {
    title: 'Templates/Charts',
    component: CFunnelStackChart,
};
const ChartWrap = styled.div `
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 10px;
`;
export const FunnelStackChart = (props) => {
    return (_jsx(ChartWrap, { children: _jsx(CFunnelStackChart, Object.assign({}, props)) }));
};
FunnelStackChart.args = {
    data: [
        {
            name: 'organic',
            stack: 'UV',
            data: [60, 30, 10, 10, 2],
        },
        {
            name: 'paid',
            stack: 'UV',
            data: [20, 16, 30, 10, 1],
        },
    ],
    xAixData: ['UV', '주문신청', '주문완료'],
};
