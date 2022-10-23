import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout } from 'mi-ui/src';
import { Select as CSelect, RadioButton, Table } from 'mi-ui';
import { css } from '@emotion/react';
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
    data: [
      { value: '판매건', subValue: ['가', '나'] },
      'PLT매출액',
      'A매출액',
      'B매출액',
    ],
  },
  {
    name: 'apr',
    renderOptions: {
      renderer: 'number',
      readonly: true,
      fontColor: 'warning',
    },
  },
  {
    name: 'may',
    renderOptions: {
      renderer: 'number',
      readonly: false,
    },
  },
  {
    name: 'june',
    renderOptions: {
      renderer: 'number',
      readonly: false,
    },
  },
];
const rowData = [
  {
    division: '판매건',
    apr: '1',
    may: 2,
    june: 3,
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

const Sample = () => {
  return (
    <PageLayout>
      <div>Sample Page</div>
      <Table
        rowData={rowData}
        columns={columns}
        headers={headerData}
        css={css`
          // background-color: red;
          max-width: 500px;
        `}
      />
      <Outlet />
    </PageLayout>
  );
};

export default Sample;
