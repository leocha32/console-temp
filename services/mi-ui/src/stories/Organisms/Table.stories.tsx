import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table as CTable, ITableContainerProps } from 'components/Organisms';
import { Select } from 'components/Atoms/Select';
export default {
  title: 'Organisms/Table',
  component: CTable,
} as ComponentMeta<typeof CTable>;

export const Table: ComponentStory<typeof CTable> = (args: ITableContainerProps) => (
  <CTable {...args} />
);
const headers = [
  {
    name: '순위',
  },
  {
    name: '재 렌탈 개요',
    columns: [
      {
        name: '소유권도래',
        header: 'First Name',
      },
      {
        name: '재렌탈',
        columns: [
          {
            name: '재 렌탈',
            header: '재 렌탈',
          },
          {
            name: '동일 제품군',
            header: '동일 제품군',
          },
        ],
      },
    ],
  },
];

const columns = [
  {
    name: 'marketShareRank',
    label: '순위',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
    },
  },
  {
    name: 'brand',
    label: '회사',
  },
  {
    name: 'marketShareValue',
    label: '시장 점유율',
    options: {
      textFormat: (value) => `${value}%`,
    },
  },
  {
    name: 'gapWithCoway',
    label: '경쟁사 대비',
    options: {
      textFormat: (value) => {
        const [a, b] = String(value).split(',');
        return a === '코웨이' ? '-' : `${+b > 0 ? '▲' : '▼'} ${Math.abs(+b)}%`;
      },
      colorFormat: (value) => {
        const [a, b] = String(value).split(',');
        return a === '코웨이' ? 'black' : +b > 0 ? 'red' : 'blue';
      },
    },
  },
];
const rowData = [
  {
    name: 'label',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
    },
    data: [
      {
        colName: 'marketShareRank',
        value: '순위',
      },
      {
        colName: 'brand',
        value: '회사',
      },
      {
        colName: 'marketShareValue',
        value: '시장 점유율',
      },
      {
        colName: 'gapWithCoway',
        value: '경쟁사 대비',
      },
    ],
  },
  {
    name: '1',
    data: [
      {
        colName: 'marketShareRank',
        value: 1,
      },
      {
        colName: 'brand',
        value: '코웨이',
      },
      {
        colName: 'marketShareValue',
        value: 26.2,
      },
      {
        colName: 'gapWithCoway',
        value: '코웨이,0',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
  {
    name: '2',
    data: [
      {
        colName: 'marketShareRank',
        value: 2,
      },
      {
        colName: 'brand',
        value: 'LG전자',
      },
      {
        colName: 'marketShareValue',
        value: 23.3,
      },
      {
        colName: 'gapWithCoway',
        value: 'LG전자,2.9',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
  {
    name: '3',
    data: [
      {
        colName: 'marketShareRank',
        value: 3,
      },
      {
        colName: 'brand',
        value: 'SK매직',
      },
      {
        colName: 'marketShareValue',
        value: 16.4,
      },
      {
        colName: 'gapWithCoway',
        value: 'SK매직,9.8',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
];

const summary = {
  label: '평균',
  options: {
    sx: {
      backgroundColor: 'lightgray',
      borderRight: 'solid 1px black',
    },
  },
  summaryInfo: [
    {
      colName: 'gapWithCoway', //column 이름이 있을경우 없으면 맨 마지막 컬럼에 정의
      value: '6.35%',
      options: {
        sx: {
          backgroundColor: 'lightgray',
          textAlign: 'center',
        },
      },
    },
  ],
};
Table.args = {
  rows: rowData,
  columns: columns,
  headers: headers,
  showHeader: false,
  summary: summary,
  sx: {
    maxWidth: '500px',
  },
};
