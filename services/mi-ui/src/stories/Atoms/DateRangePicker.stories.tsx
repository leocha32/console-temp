import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DateRangePicker as CDateRangePicker,
  IDateRangePrickerProps,
} from 'components/Atoms';

export default {
  title: 'Atoms/DateRangePicker',
  component: CDateRangePicker,
} as ComponentMeta<typeof CDateRangePicker>;

export const DateRangePicker: ComponentStory<typeof CDateRangePicker> = (
  args: IDateRangePrickerProps,
) => {
  return <CDateRangePicker {...args} onChange={console.log} />;
};

DateRangePicker.args = {};
