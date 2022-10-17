import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Button, TButtonProps } from 'components/Atoms';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const PrimaryButton: ComponentStory<typeof Button> = (args: TButtonProps) => <Button {...args} />;

PrimaryButton.args = {
  children: 'Button',
  color: 'primary',
};

export const DisabledButton: ComponentStory<typeof Button> = (args: TButtonProps) => <Button {...args} />;

DisabledButton.args = {
  children: 'Button',
  disabled: true,
};
