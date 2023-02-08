import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Grid as CGrid, GridFilter } from 'components/Organisms';

export default {
  title: 'Organisms/Grid',
  component: CGrid,
} as ComponentMeta<typeof CGrid>;

export const Grid: ComponentStory<typeof CGrid> = () => (
  <CGrid
    columns={[
      {
        header: '매체구분',
        // enableGrouping: true,
        accessorKey: 'division',
      },
      {
        header: '매체',
        accessorKey: 'media',
      },
      {
        header: '섹션',
        accessorKey: 'section',
      },
      {
        header: '가격',
        accessorKey: 'price',
        cell: ({ renderValue }) => {
          const value: string = renderValue() as string;
          return value?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        },
      },
      {
        header: '유입',
        accessorKey: 'inflowCnt',
      },
    ]}
    data={[
      {
        division: 'DA',
        media: '네이버',
        price: '15000',
        inflowCnt: '',
      },
      {
        division: 'DA',
        media: '카카오',
        price: '15000',
        inflowCnt: '',
      },
      {
        division: 'DA',
        media: '구글',
        price: '15000',
        inflowCnt: '',
      },
      {
        division: 'VA',
        media: '구글',
        price: '15000',
        inflowCnt: '',
      },
      {
        division: 'VA',
        media: 'FB/IG',
        price: '15000',
        inflowCnt: '',
      },
    ]}
  />
);
