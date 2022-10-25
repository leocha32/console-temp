import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PieChart as CPieChart, IPieChartProps } from 'components/Templates';
import styled from '@emotion/styled';

export default {
  title: 'Templates/Charts',
  component: CPieChart,
} as ComponentMeta<typeof CPieChart>;

const ChartWrap = styled.div`
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;
export const PieChart: ComponentStory<typeof CPieChart> = (props: IPieChartProps) => {
  return (
    <ChartWrap>
      <CPieChart {...props} />
    </ChartWrap>
  );
};

PieChart.args = {
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
  tooltip: { valueFormatter: (value) => `${value}%` },
};
