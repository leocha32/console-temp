import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs as CBreadcrumbs, IBreadcrumbsProps } from 'components/Atoms';

export default {
  title: 'Atoms/Breadcrumbs',
  component: CBreadcrumbs,
} as ComponentMeta<typeof CBreadcrumbs>;

export const Breadcrumbs: ComponentStory<typeof CBreadcrumbs> = (args: IBreadcrumbsProps) => <CBreadcrumbs {...args} />;

Breadcrumbs.args = {
  crumbs: [{ name: 'HOME' }, { name: 'Atoms' }, { name: 'Breadcrumbs' }],
  separator: '›',
};
