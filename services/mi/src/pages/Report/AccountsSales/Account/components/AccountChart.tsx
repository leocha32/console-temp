import React, { useRef, useState, useCallback } from 'react';
import { BarChart, ChartPosition } from 'mi-ui/src';
import { CardTitle, Card } from '$pages/Report/commonStyled';
export const AccountChart = () => {
  return (
    <Card>
      <CardTitle>계정 수</CardTitle>
      <BarChart
        data={[
          {
            name: '스탠드',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: ChartPosition.INSIDE,
              formatter: ({ value, dataIndex }) => {
                const per = [19, 19, 18, 18];
                return `${value.toLocaleString('ko-kr')} (${per[dataIndex]}%)`;
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: [483666, 483225, 482604, 482604],
            markPoint: {
              label: {
                show: true,
                position: ['50%', '50%'],
              },
            },
          },
          {
            name: '얼음',
            type: 'bar',
            stack: 'total',
            label: {
              position: ChartPosition.INSIDE,
              formatter: ({ value, dataIndex }) => {
                const per = [12, 12, 12, 12];
                return `${value.toLocaleString('ko-kr')} (${per[dataIndex]}%)`;
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: [302913, 305744, 309404, 309404],
          },
          {
            name: '얼음 스탠드',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: ChartPosition.INSIDE,
              formatter: ({ value, dataIndex }) => {
                const per = [5, 5, 5, 5];
                return `${value.toLocaleString('ko-kr')} (${per[dataIndex]}%)`;
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: [133623, 134376, 135006, 135006],
          },
          {
            name: '일반',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: ChartPosition.INSIDE,
              formatter: ({ value, dataIndex }) => {
                const per = [65, 65, 65, 65];
                return `${value.toLocaleString('ko-kr')} (${per[dataIndex]}%)`;
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: [1687506, 1688200, 1686883, 1686883],
          },
          {
            name: '',
            type: 'bar',
            color: 'red',
            barWidth: 1,
            tooltip: {
              show: false,
            },
            label: {
              show: true,
              position: [-65, '-20%'],
              formatter: ({ value, dataIndex }) => {
                return `${value.toLocaleString('ko-kr')}`;
              },
            },
            data: [2607708, 2611545, 2613897, 2613897],
          },
        ]}
        xAixData={['2022년 02월', '2022년 03월', '2022년 04월', '2022년 05월']}
        yAxis={[
          {
            type: 'value',
            name: 'Precipitation',
          },
          {
            type: 'value',
            name: 'Temperature',
          },
        ]}
      />
    </Card>
  );
};
