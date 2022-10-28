import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DeleteIcon from '@mui/icons-material/Delete';

// Components
import { IconButton as CIconButton, TIconButtonProps } from 'components/Atoms';

export default {
  title: 'Atoms/Button',
  component: CIconButton,
} as ComponentMeta<typeof CIconButton>;

export const IconButton: ComponentStory<typeof CIconButton> = (
  args: TIconButtonProps,
) => <CIconButton {...args} />;

IconButton.args = {
  children: <DeleteIcon />,
};
