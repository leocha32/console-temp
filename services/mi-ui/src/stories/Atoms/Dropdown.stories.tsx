import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu, Button, ButtonProps } from '@mui/material';
import {
  Dropdown as CDropdown,
  IDropdownProps,
} from 'components/Atoms/Dropdown/Dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: CDropdown,
} as ComponentMeta<typeof CDropdown>;

export const Dropdown: ComponentStory<typeof CDropdown> = (args: IDropdownProps) => {
  return <CDropdown {...args} />;
};

Dropdown.args = {
  title: 'test',
  buttonProps: {
    variant: 'outlined',
  },
  options: [
    {
      label: 'test1',
      key: 'test1',
    },
    {
      label: 'test2',
      key: 'test2',
      children: [
        {
          label: 'test1',
          key: 'test3',
        },
        {
          label: 'test1',
          key: 'test4',
        },
      ],
    },
  ],
};
