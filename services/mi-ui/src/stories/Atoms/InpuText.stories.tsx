import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { InputText as CInputText, TInputTextProps } from 'components/Atoms';

export default {
  title: 'Atoms/InputText',
  component: CInputText,
} as ComponentMeta<typeof CInputText>;

export const InputText: ComponentStory<typeof CInputText> = (args: TInputTextProps) => (
  <CInputText {...args} />
);

InputText.args = {};

export const DisabledInputText: ComponentStory<typeof CInputText> = (
  args: TInputTextProps,
) => <CInputText {...args} />;

DisabledInputText.args = {
  disabled: true,
};
