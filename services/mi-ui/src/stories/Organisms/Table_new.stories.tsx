import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table as CTable, ITableProps } from 'components/Organisms/Table_New';

export default {
  title: 'Organisms/Table_new',
  component: CTable,
} as ComponentMeta<typeof CTable>;

export const Table1: ComponentStory<typeof CTable<any>> = (args: ITableProps<any>) => (
  <CTable<any> {...args} />
);

Table1.args = {
  data: [
    { test1: 'test1', test2: 'test2', test3: 'test3', test4: 'test4' },
    { test1: 'test1', test2: 'test2', test3: 'test3', test4: 'test4' },
    { test1: 'test1', test2: 'test2', test3: 'test3', test4: 'test4' },
    { test1: 'test1', test2: 'test2', test3: 'test3', test4: 'test4' },
    { test1: 'test1', test2: 'test2', test3: 'test3', test4: 'test4' },
    { test1: 'test1', test2: 'test2', test3: 'test3', test4: 'test4' },
  ],
  columns: [
    { label: 'Test1', id: 'test1' },
    { label: 'Test2', id: 'test2' },
    { label: 'Test3', id: 'test3' },
    { label: 'Test4', id: 'test4' },
  ],
};

export const Table2: ComponentStory<typeof CTable<any>> = (args: ITableProps<any>) => (
  <CTable<any> {...args} />
);

Table2.args = {
  data: [
    { test1: '26%', test2: '1위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '9%', test2: '4위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '22%', test2: '2위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '5%', test2: '5위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '6%', test2: '6위', test3: 'test3', test4: 'test4', test5: 'test5' },
  ],
  columns: [
    { label: '', id: '' },
    { label: '정수기', id: 'test1' },
    { label: '청정기', id: 'test2' },
    { label: '비데', id: 'test3' },
    { label: '매트리스', id: 'test4' },
    { label: '안마의자', id: 'test5' },
  ],
  rowHeader: [
    { label: '당사 시장점유율(순위)', id: 'test1' },
    { label: '당사 직전 반기 대비 차이', id: 'test2' },
    { label: '브랜드 점유율 Top3위', id: 'test3' },
    { label: '제품 보급률', id: 'test4' },
  ],
};

export const Table3: ComponentStory<typeof CTable<any>> = (args: ITableProps<any>) => (
  <CTable<any> {...args} />
);

Table3.args = {
  data: [
    { test1: '26%', test2: '1위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '9%', test2: '4위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '22%', test2: '2위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '5%', test2: '5위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '6%', test2: '6위', test3: 'test3', test4: 'test4', test5: 'test5' },
  ],
  columns: [
    { label: '구분', id: 'test1', colSpan: 2 },
    { label: '21년 4월', id: 'test2' },
    { label: '5월', id: 'test3' },
    { label: '6월', id: 'test4' },
    { label: '7월', id: 'test5' },
    { label: '8월', id: 'test5' },
    { label: '9월', id: 'test5' },
  ],
  rowHeader: [
    { label: '판매 건', id: '' },
    { label: 'PLT 매출액', id: '' },
    { label: 'PLT 매출액', id: '' },
  ],
};

export const Table4: ComponentStory<typeof CTable<any>> = (args: ITableProps<any>) => (
  <CTable<any> {...args} />
);

Table4.args = {
  data: [
    { test1: '26%', test2: '1위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '9%', test2: '4위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '22%', test2: '2위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '5%', test2: '5위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '6%', test2: '6위', test3: 'test3', test4: 'test4', test5: 'test5' },
  ],
  columns: [
    { label: '순번', id: 'test1' },
    {
      label: '조합',
      id: 'test2',
      cell: (row) => [{ render: row.test2 }, { render: row.test3 }],
      colSpan: 2,
    },
    { label: '고객수 ', id: 'test4' },
    { label: '비율', id: 'test5' },
  ],
};

export const Table5: ComponentStory<typeof CTable<any>> = (args: ITableProps<any>) => (
  <CTable<any> {...args} />
);

Table5.args = {
  data: [
    { test1: '26%', test2: '1위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '9%', test2: '4위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '22%', test2: '2위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '5%', test2: '5위', test3: 'test3', test4: 'test4', test5: 'test5' },
    { test1: '6%', test2: '6위', test3: 'test3', test4: 'test4', test5: 'test5' },
  ],
  columns: [
    { label: '연도.월', id: 'test1', rowSpan: 2 },
    {
      label: '소유권 도래',
      id: '소유권도래',
      columns: [
        { label: '정수기', id: 'test5' },
        { label: '청정기', id: 'test5' },
        { label: '비데', id: 'test5' },
        { label: '매트리스', id: 'test5' },
        { label: '연수기', id: 'test5' },
      ],
    },
    {
      label: '소유권 유지율',
      id: 'test4',
      columns: [
        { label: '정수기', id: 'test5' },
        { label: '청정기', id: 'test5' },
        { label: '비데', id: 'test5' },
        { label: '매트리스', id: 'test5' },
        { label: '연수기', id: 'test5' },
      ],
    },
  ],
};

export const Table6: ComponentStory<typeof CTable<any>> = (args: ITableProps<any>) => (
  <CTable<any> {...args} />
);

Table6.args = {
  data: [
    { test1: '지상파', test2: 'KBS', test3: 3, test4: 1, test5: 4 },
    { test2: 'SBS', test3: 3, test4: 4, test5: 3 },
    { test2: 'MBC', test3: 2, test4: 2, test5: 7 },
  ],
  footer: [
    {
      render: '지상파계 ',
      colSpan: 2,
    },
    {
      render: (data) => data.reduce((pre, cur) => pre + cur.test3, 0),
    },
    {
      render: (data) => data.reduce((pre, cur) => pre + cur.test4, 0),
    },
    {
      render: (data) => data.reduce((pre, cur) => pre + cur.test5, 0),
    },
  ],
  columns: [
    {
      label: '매체',
      id: 'test1',
      cell: (row) => ({
        render: row.test1,
        rowSpan: 3,
      }),
    },
    {
      label: '채널',
      id: 'test2',
    },
    {
      label: '광고비(억원)',
      id: 'test3',
    },
    {
      label: '횟수',
      id: 'test4',
    },
    {
      label: '당월누적GRP',
      id: 'test5',
    },
  ],
};
