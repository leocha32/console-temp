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
  options: [
    {
      key: '2021',
      value: '2021',
    },
    {
      key: '2022',
      value: '2022',
    },
    {
      key: '2023',
      value: '2023',
    },
  ],
  autoWidth: true,
};

export const MultiSelect: ComponentStory<typeof CSelect> = (args: ISelectProps) => <CSelect {...args} />;

MultiSelect.args = {
  options: [
    {
      key: '2021',
      value: '2021',
    },
    {
      key: '2022',
      value: '2022',
    },
    {
      key: '2023',
      value: '2023',
    },
  ],
  autoWidth: true,
  multiple: true,
};
