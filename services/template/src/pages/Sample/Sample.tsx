import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout } from 'mi-ui/src';
import { TableHeader, Select as CSelect, RadioButton, Table, BaseEChart } from 'mi-ui';
import { css } from '@emotion/react';
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

const Sample = () => {
  return (
    <PageLayout>
      <div>Sample Page</div>

      <Table headers={headers} columns={columns} rowData={rowData}></Table>
      <Outlet />
    </PageLayout>
  );
};
const columns = [
  {
    name: 'division',
    renderer: 'text',
    colSpan: 2,
  },
  {
    name: 'apr',
    renderer: 'number',
    css: css`
      font-color: red;
    `,
  },
  {
    name: 'may',
    renderer: 'number',
    fontColor: 'warning',
  },
  {
    name: 'june',
    renderer: 'number',
    fontColor: 'warning',
  },
];
const rowData = [
  {
    value: '매출액',
    subValues: [
      {
        division_2: 'A',
        apr: '4',
        may: 5,
        june: 6,
      },
      {
        division_2: 'A',
        apr: '4',
        may: 5,
        june: 6,
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
    june: [1, 2, 3],
  },
];
export default Sample;
