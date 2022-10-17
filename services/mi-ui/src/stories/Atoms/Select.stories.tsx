import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Select as CSelect, ISelectProps } from 'components/Atoms';

export default {
  title: 'Atoms/Select',
  component: CSelect,
} as ComponentMeta<typeof CSelect>;

export const Select: ComponentStory<typeof CSelect> = (args: ISelectProps) => <CSelect {...args} />;

Select.args = {
  options: ['A', 'B', 'C'],
};

export const MultiSelect: ComponentStory<typeof CSelect> = (args: ISelectProps) => <CSelect {...args} />;

MultiSelect.args = {
  options: ['A', 'B', 'C'],
  multiple: true,
};
