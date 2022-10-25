import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout } from 'mi-ui/src';
import { TableHeader, Select as CSelect, RadioButton, Table, BaseEChart } from 'mi-ui';
import { css } from '@emotion/react';
const headerData = [
  {
    label: '제품군',
    rowSpan: 3,
  },
  {
    label: '재렌탈 개요',
    child: [
      {
        label: '소유권도래',
        rowSpan: 2,
      },
      {
        label: '재렌탈',
        colSpan: 3,
        child: [
          {
            label: '재 렌탈',
          },
          {
            label: '동일 제품군',
          },
          {
            label: '타 제품군',
          },
        ],
      },
    ],
    colSpan: 4,
  },
];

const Sample = () => {
  return (
    <PageLayout>
      <div>Sample Page</div>
      <TableHeader headers={headerData}></TableHeader>
      {/*<Table*/}
      {/*  rowData={rowData}*/}
      {/*  columns={columns}*/}
      {/*  headers={headerData}*/}
      {/*  css={css`*/}
      {/*    // background-color: red;*/}
      {/*    max-width: 1000px;*/}
      {/*  `}*/}
      {/*/>*/}
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
    june: 6,
  },
];
export default Sample;
