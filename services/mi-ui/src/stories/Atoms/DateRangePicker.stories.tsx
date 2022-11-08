import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DateRangePicker as CDateRangePicker,
  TDateRangePickerProps,
} from 'components/Atoms';

export default {
  title: 'Atoms/DateRangePicker',
  component: CDateRangePicker,
} as ComponentMeta<typeof CDateRangePicker>;

export const DateRangePicker: ComponentStory<typeof CDateRangePicker> = (
  args: TDateRangePickerProps,
) => {
  return <CDateRangePicker {...args} />;
};

DateRangePicker.args = {};
