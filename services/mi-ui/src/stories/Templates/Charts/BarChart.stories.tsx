import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BarChart as CBarChart, IBarChartProps } from 'components/Templates';
import styled from '@emotion/styled';

export default {
  title: 'Templates/Charts',
  component: CBarChart,
} as ComponentMeta<typeof CBarChart>;

const ChartWrap = styled.div`
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;
export const BarChart: ComponentStory<typeof CBarChart> = (props: IBarChartProps) => {
  return (
    <ChartWrap>
      <CBarChart {...props} />
    </ChartWrap>
  );
};

export const MultiDataBarChart: ComponentStory<typeof CBarChart> = (
  props: IBarChartProps,
) => {
  return (
    <ChartWrap>
      <CBarChart {...props} />
    </ChartWrap>
  );
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
