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
const columnData = [
  {
    name: 'division',
  },
  {
    name: 'apr',
  },
  {
    name: 'may',
    renderOptions: {
      renderer: 'number',
    },
  },
  {
    name: 'june',
    renderOptions: {
      renderer: 'number',
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
        headers={headerData}
        columns={columnData}
        css={css`
          // background-color: red;
        `}
      >
        test
      </Table>
      <Outlet />
    </PageLayout>
  );
};

export default Sample;
