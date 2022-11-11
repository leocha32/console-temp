import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Button, IButtonProps } from 'components/Atoms';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const PrimaryButton: ComponentStory<typeof Button> = (args: IButtonProps) => (
  <Button {...args} />
);

PrimaryButton.args = {
  children: 'Buttontesgt',
  color: 'primary',
};

export const DisabledButton: ComponentStory<typeof Button> = (args: IButtonProps) => (
  <Button {...args} />
);

DisabledButton.args = {
  children: 'Button',
  disabled: true,
};
