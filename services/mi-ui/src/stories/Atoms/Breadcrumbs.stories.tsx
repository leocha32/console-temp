import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumbs as CBreadcrumbs, IBreadcrumbsProps } from 'components/Atoms';
import Home from '@mui/icons-material/Home';

export default {
  title: 'Atoms/Breadcrumbs',
  component: CBreadcrumbs,
} as ComponentMeta<typeof CBreadcrumbs>;

export const Breadcrumbs: ComponentStory<typeof CBreadcrumbs> = (
  args: IBreadcrumbsProps,
) => <CBreadcrumbs {...args} />;

Breadcrumbs.args = {
  crumbs: [{ name: 'HOME', icon: <Home /> }, { name: 'Atoms' }, { name: 'Breadcrumbs' }],
  separator: '›',
};
