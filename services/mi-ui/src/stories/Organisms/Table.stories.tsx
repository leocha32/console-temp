import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { Table as CTable, ITableContainerProps } from 'components/Organisms';

export default {
  title: 'Organisms/Table',
  component: CTable,
} as ComponentMeta<typeof CTable>;

export const Table: ComponentStory<typeof CTable> = (args: ITableContainerProps) => (
  <CTable {...args} />
);

Table.args = {};
