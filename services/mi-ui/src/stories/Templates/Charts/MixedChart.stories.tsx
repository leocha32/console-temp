import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MixedChart as CMixedChart, IMixedChartProps } from 'components/Templates';
import styled from '@emotion/styled';

export default {
  title: 'Templates/Charts',
  component: CMixedChart,
} as ComponentMeta<typeof CMixedChart>;

const ChartWrap = styled.div`
  height: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;
export const MixedChart: ComponentStory<typeof CMixedChart> = (
  props: IMixedChartProps,
) => {
  return (
    <ChartWrap>
      <CMixedChart {...props} />
    </ChartWrap>
  );
};

MixedChart.args = {
  data: [
    {
      name: 'CPP',
      type: 'bar',
      data: [
        150550, 150550, 102105, 200305, 183020, 142060, 167291, 90820, 192038, 178291,
        164231, 182948,
      ],
    },
    {
      name: '매출 비중',
      type: 'line',
      data: [5, 5.2, 5.8, 3.2, 10.1, 8.8, 7.5, 6.8, 9.8, 7.9, 11.4, 8.2],
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
  yAxis: [
    {
      type: 'value',
      name: 'ccp',
      axisLabel: {
        formatter: '{value}(원)',
      },
    },
    {
      type: 'value',
      name: '매출 비중',
      axisLabel: {
        formatter: '{value}%',
      },
    },
  ],
  legend: {
    data: ['CPP', '매출 비중'],
  },
  showLegendBottom: false,
  useYAxis: true,
  useTooltip: true,
};
