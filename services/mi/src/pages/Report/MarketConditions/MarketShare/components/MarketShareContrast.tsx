import React from 'react';
import { ICompetitorComparison } from '$modules/report/marketConditions/marketShare';

import styled from '@emotion/styled';
import { Table, TRowProps, TColumnProps } from 'mi-ui';
import { Card as MiCard } from 'mi-ui/src';

const Card = styled(MiCard)`
  display: flex;
  grid-column: 1/2;
  grid-row: 2/3;
  background-color: #fafafa;
  padding: 20px;
`;

export interface IMarketShareContrastProps {
  data: ICompetitorComparison[];
}
const labelData: TRowProps[] = [
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
];
const columnConfig: TColumnProps[] = [
  {
    name: 'marketShareRank',
    label: '순위',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
        height: '10px',
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
      textFormat: (value) => `${value > 0 ? '▲' : '▼'} ${Math.abs(+value)}%`,
      colorFormat: (value) => {
        return value > 0 ? 'red' : 'blue';
      },
    },
  },
];

const makeRowData = (data) => {
  if (data.length === 0) return [];
  const sortData = [
    data.find(({ brand }) => brand === '코웨이'),
    ...data
      .filter(({ brand }) => brand !== '코웨이')
      .sort((a, b) => {
        return a.marketShareRank - b.marketShareRank;
      }),
  ];
  const orderStandard = columnConfig.map(({ name }) => name);

  const rowData: TRowProps[] = sortData.map((data, i) => {
    const rowData = orderStandard.map((orderName) => {
      return {
        colName: orderName,
        value: orderName === 'gapWithCoway' ? data[orderName] * -1 : data[orderName],
      };
    });
    return {
      name: i + 1 + '', //row 번호
      data: rowData,
      options: {
        sx: {
          height: '30px',
        },
      },
    };
  });
  return labelData.concat(rowData);
};

export const MarketShareContrast = ({ data }: IMarketShareContrastProps) => {
  const rowData = makeRowData(data);

  return (
    <Card>
      <Table row={rowData} columns={columnConfig}></Table>
    </Card>
  );
};
