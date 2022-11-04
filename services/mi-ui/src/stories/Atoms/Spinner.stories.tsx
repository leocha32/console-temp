import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Spinner as CSpinner, ISpinnerProps } from 'components/Atoms';

export default {
  title: 'Atoms/Spinner',
  component: CSpinner,
} as ComponentMeta<typeof CSpinner>;

export const Spinner: ComponentStory<typeof CSpinner> = (args: ISpinnerProps) => (
  <CSpinner {...args} />
);

Spinner.args = {
  color: 'red',
};
