import React from 'react';
import { TCompetitorComparison } from '$modules/report/research';

import { Table, TRowProps, TColumnProps } from 'mi-ui';

export interface IMarketShareContrastProps {
  data: TCompetitorComparison[];
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
      textFormat: (value) => {
        const [a, b] = String(value).split(',');
        return a === '코웨이' ? '-' : `${+b > 0 ? '▲' : '▼'} ${Math.abs(+b)}%`;
      },
      colorFormat: (value) => {
        const [a, b] = String(value).split(',');
        return a === '코웨이' ? 'black' : +b > 0 ? 'red' : 'blue';
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
        value:
          orderName === 'gapWithCoway'
            ? `${data.brand},${data[orderName] * -1}`
            : data[orderName],
      };
    });
    return {
      name: i + 1 + '', //row 번호
      data: rowData,
      options: {
        height: 'inherit',
      },
    };
  });
  return labelData.concat(rowData);
};

export const MarketShareContrast = ({ data }: IMarketShareContrastProps) => {
  const rowData = makeRowData(data);

  return <Table sx={{ width: '100%' }} rows={rowData} columns={columnConfig}></Table>;
};
