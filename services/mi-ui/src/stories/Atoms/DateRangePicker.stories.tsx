import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DateRangePicker as CDateRangePicker,
  TDateRangePickerProps,
} from 'components/Atoms';
import dayjs from 'dayjs';

export default {
  title: 'Atoms/DateRangePicker',
  component: CDateRangePicker,
} as ComponentMeta<typeof CDateRangePicker>;

export const DateRangePicker: ComponentStory<typeof CDateRangePicker> = (
  args: TDateRangePickerProps,
) => {
  return <CDateRangePicker {...args} />;
};

DateRangePicker.args = {
  startDate: dayjs(new Date()).subtract(1, 'month').toDate(),
  endDate: new Date(),
  size: 'small',
  onChange: (startDate, endDate) => console.log(startDate, endDate),
};
