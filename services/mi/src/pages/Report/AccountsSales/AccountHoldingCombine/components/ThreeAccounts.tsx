import React from 'react';
import { Table } from 'mi-ui';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { IProductCombinationRow } from '$modules/report/accountSales';

const Headers = [
  {
    name: '순위',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '조합',
    colSpan: 3,
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '고객 수',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '비율',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
];
const Columns = [
  {
    name: 'order',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
    },
  },
  {
    name: 'accountCountGroup',
    options: {
      sx: {
        display: 'none',
      },
    },
  },
  { name: 'product1', options: {} },
  { name: 'product2', options: {} },
  {
    name: 'product3',
    options: {},
  },
  {
    name: 'product4',
    options: {
      sx: {
        display: 'none',
      },
    },
  },
  {
    name: 'customerCount',
    options: { textFormat: (value) => value.toLocaleString('ko-KR') },
  },
  { name: 'customerRate', options: { textFormat: (value) => `${value}%` } },
];

export type ThreeAccountProps = {
  data: IProductCombinationRow[] | null;
};
const columnDataToRowData = (data) => {
  if (!data) return [];
  return data.map((d, i) => {
    return {
      name: i + '',
      options: {
        height: '10px',
      },
      data: Object.keys(d).map((key) => {
        return {
          colName: key,
          value: d[key],
        };
      }),
    };
  });
};

export const ThreeAccounts = ({ data }: ThreeAccountProps) => {
  const rowData = columnDataToRowData(data);

  return (
    <Card style={{ maxHeight: '100%' }}>
      <CardTitle>3 계정</CardTitle>
      <Table rows={rowData} columns={Columns} showHeader={true} headers={Headers}></Table>
    </Card>
  );
};
