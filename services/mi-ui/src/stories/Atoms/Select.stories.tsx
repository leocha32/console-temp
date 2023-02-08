import React, { useCallback, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select as CSelect, ISelectProps } from 'components/Atoms';

export default {
  title: 'Atoms/Select',
  component: CSelect,
} as ComponentMeta<typeof CSelect>;

export const Select: ComponentStory<typeof CSelect> = (args: ISelectProps) => {
  const [selected, setSelected] = useState('');

  const handleChange = useCallback((value) => {
    setSelected(value);
  }, []);
  return <CSelect {...args} onChange={handleChange} value={selected} />;
};

Select.args = {
  options: [
    { value: 'test1', label: 'test1' },
    { value: 'test2', label: 'test2' },
  ],
};

export const MultiSelect: ComponentStory<typeof CSelect> = (args: ISelectProps) => {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => {
    setSelected(value);
  }, []);
  return <CSelect {...args} onChange={handleChange} value={selected} />;
};

MultiSelect.args = {
  multiple: true,
  useSearch: true,
  options: [
    { value: 'test1', label: 'test1' },
    { value: 'test2', label: 'test2' },
  ],
};
