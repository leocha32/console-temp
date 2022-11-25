import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import {
  RadioButton as CRadioButton,
  IRadioGroupProps,
  FlexDirection,
} from 'components/Atoms';

export default {
  title: 'Atoms/RadioButton',
  component: CRadioButton,
} as ComponentMeta<typeof CRadioButton>;

export const RadioButton: ComponentStory<typeof CRadioButton> = (
  args: IRadioGroupProps,
) => <CRadioButton {...args} />;

RadioButton.args = {
  options: ['A', 'B', 'C'],
  flexDirection: FlexDirection.ROW,
  color: 'primary',
};
