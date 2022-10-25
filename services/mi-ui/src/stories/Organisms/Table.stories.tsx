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
const headerData = [
  {
    label: '구분',
    value: 'division',
  },
  {
    label: '21년 4월',
    value: 'apr',
  },
  {
    label: '21년 5월',
    value: 'may',
  },
  {
    label: '21년 6월',
    value: 'june',
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
    value: '매출액',
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
    division: 'PLT 매출액',
    apr: '4',
    may: 5,
    june: 6,
  },
  {
    division: 'PLT 매출액',
    apr: '4',
    may: 5,
    june: 6,
  },
  {
    division: 'PLT 매출액',
    apr: '4',
    may: 5,
    june: 6,
  },
];

Table.args = {
  rowData: rowData,
  columns: columns,
  headers: headerData,
  sx: {
    maxWidth: '500px',
  },
};
