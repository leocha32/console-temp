import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { menu } from 'constants/mock';

// Components
import { Snb as CSnb, ISnbProps } from 'components/Organisms';

export default {
  title: 'Organisms/Snb',
  component: CSnb,
} as ComponentMeta<typeof CSnb>;

export const Snb: ComponentStory<typeof CSnb> = ({ menu }: ISnbProps) => {
  const [menuStatus, setMenuStatus] = useState<{ open: boolean; expands: string[] }>({ open: true, expands: [] });

  return <CSnb menu={menu} menuStatusHook={[menuStatus, setMenuStatus]} />;
};
Snb.args = {
  menu,
};
