import React, { useCallback, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs as CTabs, ITabsProps } from 'components/Atoms';

export default {
  title: 'Atoms/Tabs',
  component: CTabs,
} as ComponentMeta<typeof CTabs>;

export const Tabs: ComponentStory<typeof CTabs> = (args: ITabsProps) => {
  const [value, setValue] = useState(args.items[0].value);

  const handleChange = useCallback((e, value) => {
    setValue(value);
  }, []);
  return (
    <>
      <CTabs {...args} value={value} onChange={handleChange} />
      {value}
    </>
  );
};

Tabs.args = {
  items: [
    { value: 'tab1', label: 'Tab1' },
    { value: 'tab2', label: 'Tab2' },
    { value: 'tab3', label: 'Tap3' },
  ],
};
