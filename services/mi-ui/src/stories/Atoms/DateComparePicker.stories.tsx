import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DateComparePicker as CDateComparePicker,
  IDateComparePickerProps,
} from 'components/Atoms';

export default {
  title: 'Atoms/DateComparePicker',
  component: CDateComparePicker,
} as ComponentMeta<typeof CDateComparePicker>;

export const DateComparePicker: ComponentStory<typeof CDateComparePicker> = (
  args: IDateComparePickerProps,
) => <CDateComparePicker {...args} />;

DateComparePicker.args = {};
