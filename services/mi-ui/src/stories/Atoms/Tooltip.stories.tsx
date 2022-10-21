import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, Tooltip as CTooltip, TTooltipProps } from 'components/Atoms';

export default {
  title: 'Atoms/Tooltip',
  component: CTooltip,
} as ComponentMeta<typeof CTooltip>;

export const Tooltip: ComponentStory<typeof CTooltip> = (args: TTooltipProps) => (
  <CTooltip {...args} />
);

Tooltip.args = {
  title: 'tooltip',
  children: <Button variant="outlined">tooltip</Button>,
};
