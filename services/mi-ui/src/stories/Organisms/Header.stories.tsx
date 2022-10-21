import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Header as CHeader, IHeaderProps } from 'components/Organisms';

export default {
  title: 'Organisms/Header',
  component: CHeader,
} as ComponentMeta<typeof CHeader>;

export const Header: ComponentStory<typeof CHeader> = (props: IHeaderProps) => <CHeader {...props} />;
Header.args = {
  children: <h2>Storybook</h2>,
};
