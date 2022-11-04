import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table as CTable, ITableContainerProps } from 'components/Organisms';

export default {
  title: 'Organisms/Table',
  component: CTable,
} as ComponentMeta<typeof CTable>;

export const Table: ComponentStory<typeof CTable> = (args: ITableContainerProps) => (
  <CTable {...args} />
);
const headers = [
  {
    name: '제품군',
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
          {
            name: '타 제품군',
            header: '동일 제품군',
            colSpanOffset: 2,
          },
        ],
      },
    ],
  },
];

const columns = [
  {
    name: 'division',
    renderer: 'text',
    colSpan: 2,
  },
  {
    name: 'apr',
    renderer: 'number',
  },
  {
    name: 'may',
    renderer: 'number',
  },
  {
    name: 'june',
    renderer: 'number',
  },
];
const rowData = [
  {
    value: '정수기',
    subValues: [
      {
        division_2: '전반기',
        apr: '12,000',
        may: '32,000',
        june: '42,000',
      },
      {
        division_2: '후반기',
        apr: '9,000',
        may: '12,000',
        june: '10,000',
      },
    ],
  },
  {
    division: '청정기',
    apr: '53,000',
    may: '19,000',
    june: '71,000',
  },
  {
    division: '비데',
    apr: '8,010',
    may: '9,200',
    june: '52,900',
  },
  {
    division: '매트릭스',
    apr: '22,550',
    may: '21,040',
    june: '18,000',
  },
];

Table.args = {
  rowData: rowData,
  columns: [],
  headers: headers,
  sx: {
    maxWidth: '500px',
  },
};
