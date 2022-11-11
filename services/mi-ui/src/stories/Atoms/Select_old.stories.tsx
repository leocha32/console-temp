import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import {
  SingleSelect as CSelect,
  ISingleSelectProps,
  MultiSelect as CMultiSelect,
  IMultiSelectProps,
} from 'components/Atoms';

export default {
  title: 'Atoms/Select_old',
  components: [CSelect, CMultiSelect],
} as ComponentMeta<typeof CSelect>;

export const Select: ComponentStory<typeof CSelect> = (args: ISingleSelectProps) => (
  <CSelect {...args} />
);

Select.args = {
  isMulti: false,
  options: [
    {
      label: '2021',
      value: '2021',
    },
    {
      label: '2022',
      value: '2022',
    },
    {
      label: '2023',
      value: '2023',
    },
  ],
};

export const MultiSelect: ComponentStory<typeof CMultiSelect> = (
  args: IMultiSelectProps,
) => {
  const [selected, setSelected] = useState<any>([]);

  const onChange = (value) => {
    setSelected(value);
  };

  return <CMultiSelect {...args} value={selected} onChange={onChange} />;
};

MultiSelect.args = {
  width: '300px',
  options: [
    { value: '1', label: 'Jimmy' },
    { value: '2', label: 'Laura' },
    { value: '3', label: 'Tommy' },
    { value: '4', label: 'Jane' },
    { value: '5', label: 'Mike' },
  ],
  selectAllLabel: '모두선택',
};
