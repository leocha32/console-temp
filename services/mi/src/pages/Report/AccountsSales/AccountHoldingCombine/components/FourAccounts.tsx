import React from 'react';
import { Table } from 'mi-ui';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { TProductCombinationRow } from '$modules/report/accountSales';

const Headers = [
  {
    name: '순위',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '조합',
    colSpan: 4,
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
        width: '5%',
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
  {
    name: 'product1',
    options: {
      sx: {},
    },
  },
  {
    name: 'product2',
    options: {
      sx: {},
    },
  },
  {
    name: 'product3',
    options: {
      sx: {},
    },
  },
  {
    name: 'product4',
    options: {
      sx: {},
    },
  },
  {
    name: 'customerCount',
    options: {
      sx: {
        width: '10%',
        textAlign: 'right' as const,
      },
      textFormat: (value) => value.toLocaleString('ko-KR'),
    },
  },
  {
    name: 'customerRate',
    options: {
      sx: {
        width: '10%',
        textAlign: 'right' as const,
      },
      textFormat: (value) => `${value.toFixed(1)}%`,
    },
  },
];

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

export type TFourAccountProps = {
  data: TProductCombinationRow[] | null;
};

export const FourAccounts = ({ data }: TFourAccountProps) => {
  const rowData = columnDataToRowData(data);
  return (
    <Card sx={{ width: '35%' }}>
      <CardTitle>4 계정</CardTitle>
      <Table rows={rowData} columns={Columns} showHeader={true} headers={Headers}></Table>
    </Card>
  );
};
