import React from 'react';
import { ICowayBrandAwareness } from '$modules/report/marketConditions/brandAwareness';

import { Card, Section, CardTitle } from '$pages/Report/commonStyled';
import { Table } from 'mi-ui/src';

export interface ICompetitorExecutionStatusProps {
  data: ICowayBrandAwareness[];
}

const columns = [
  {
    name: 'sortation',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
    },
  },
  {
    name: 'brand',
  },
  {
    name: 'marketShareValue',
  },
  {
    name: 'marketShareValue',
  },
  {
    name: 'gapWithCoway',
    label: '광고 링크',
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
const rowData = [
  {
    name: 'label',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
    },
    data: [
      {
        colName: 'sortation',
        value: '구분',
      },
      {
        colName: 'mediaScaffolding',
        value: 'TV매체비계',
      },
      {
        colName: 'terrestrial',
        value: '지상파',
      },
      {
        colName: 'catv',
        value: 'CATV/종편',
      },
      {
        colName: 'advertisingLink',
        value: '광고링크',
      },
    ],
  },
  {
    name: '1',
    data: [
      {
        colName: 'sortation',
        value: '코웨이',
      },
      {
        colName: 'mediaScaffolding',
        value: '0',
      },
      {
        colName: 'terrestrial',
        value: 0,
      },
      {
        colName: 'catv',
        value: '0',
      },
      {
        colName: 'advertisingLink',
        value: '광고링크',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
  {
    name: '2',
    data: [
      {
        colName: 'sortation',
        value: '삼성전자',
      },
      {
        colName: 'mediaScaffolding',
        value: '0',
      },
      {
        colName: 'terrestrial',
        value: 0,
      },
      {
        colName: 'catv',
        value: '0',
      },
      {
        colName: 'advertisingLink',
        value: '광고링크',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
  {
    name: '3',
    data: [
      {
        colName: 'sortation',
        value: 'LG전자',
      },
      {
        colName: 'mediaScaffolding',
        value: '0',
      },
      {
        colName: 'terrestrial',
        value: 0,
      },
      {
        colName: 'catv',
        value: '0',
      },
      {
        colName: 'advertisingLink',
        value: '광고링크',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
  {
    name: '4',
    data: [
      {
        colName: 'sortation',
        value: '청호나이스',
      },
      {
        colName: 'mediaScaffolding',
        value: '0',
      },
      {
        colName: 'terrestrial',
        value: 0,
      },
      {
        colName: 'catv',
        value: '0',
      },
      {
        colName: 'advertisingLink',
        value: '광고링크',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
  {
    name: '5',
    data: [
      {
        colName: 'sortation',
        value: 'SK매직',
      },
      {
        colName: 'mediaScaffolding',
        value: '0',
      },
      {
        colName: 'terrestrial',
        value: 0,
      },
      {
        colName: 'catv',
        value: '0',
      },
      {
        colName: 'advertisingLink',
        value: '광고링크',
      },
    ],
    options: {
      height: 'inherit',
    },
  },
];
const CompetitorExecutionStatus = ({ data }: ICompetitorExecutionStatusProps) => {
  return (
    <Card>
      <CardTitle>경쟁사 집행 현황</CardTitle>
      {/*{data?.length ? (*/}
      <Section>
        <Table showHeader={false} rows={rowData} columns={columns}></Table>
      </Section>
      {/*) : (*/}
      {/*  <EmptyContent />*/}
      {/*)}*/}
    </Card>
  );
};

export default CompetitorExecutionStatus;
