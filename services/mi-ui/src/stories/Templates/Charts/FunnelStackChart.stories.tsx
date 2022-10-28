import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  FunnelStackChart as CFunnelStackChart,
  IFunnelStackChartProps,
} from 'components/Templates';
import styled from '@emotion/styled';

export default {
  title: 'Templates/Charts',
  component: CFunnelStackChart,
} as ComponentMeta<typeof CFunnelStackChart>;

const ChartWrap = styled.div`
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 10px;
`;
export const FunnelStackChart: ComponentStory<typeof CFunnelStackChart> = (
  props: IFunnelStackChartProps,
) => {
  return (
    <ChartWrap>
      <CFunnelStackChart {...props} />
    </ChartWrap>
  );
};

FunnelStackChart.args = {
  data: [
    {
      name: 'organic',
      stack: 'UV',
      data: [60, 30, 10, 10],
    },
    {
      name: 'paid',
      stack: 'UV',
      data: [20, 16, 30, 10],
    },
  ],
  xAixData: ['UV', '주문신청', '주문완료', '1주문완료'],
};
