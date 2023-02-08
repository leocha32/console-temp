import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { menu } from 'constants/mock';

// Components
import { Layout as CLayout, ILayoutProps } from 'components/Templates';

export default {
  title: 'Templates/Layout',
  component: CLayout,
} as ComponentMeta<typeof CLayout>;

export const Layout: ComponentStory<typeof CLayout> = (props: ILayoutProps) => {
  const [menuStatus, setMenuStatus] = useState<{ open: boolean; expands: string[] }>({
    open: true,
    expands: [],
  });

  return <CLayout {...props} menuStatusHook={[menuStatus, setMenuStatus]} />;
};

Layout.args = {
  menu:
    menu
      ?.find((route) => (route.path = '/'))
      ?.children?.filter((child) => !child?.index && !child.hidden) || [],
  header: <h2>Storybook</h2>,
};
