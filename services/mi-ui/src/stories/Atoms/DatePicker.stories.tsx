import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatePicker as CDatePicker, TDatePickerProps } from 'components/Atoms';

export default {
  title: 'Atoms/DatePicker',
  component: CDatePicker,
} as ComponentMeta<typeof CDatePicker>;

export const DatePicker: ComponentStory<typeof CDatePicker> = (
  args: TDatePickerProps,
) => {
  const [date, onChangeDate] = useState<Dayjs | null>(dayjs());

  return <CDatePicker {...args} value={date} onChange={onChangeDate} />;
};

DatePicker.args = {};
