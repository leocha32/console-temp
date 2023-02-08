import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox as CCheckbox, ICheckboxProps } from 'components/Atoms';
export default {
  title: 'Atoms/Checkbox',
  component: CCheckbox,
} as ComponentMeta<typeof CCheckbox>;

export const Checkbox: ComponentStory<typeof CCheckbox> = (args: ICheckboxProps) => (
  <CCheckbox {...args} />
);

Checkbox.args = {};
