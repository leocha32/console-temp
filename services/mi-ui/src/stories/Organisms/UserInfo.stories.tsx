import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserInfo as CUserInfo, IUserInfoProps } from 'components/Organisms';

export default {
  title: 'Organisms/UserInfo',
  component: CUserInfo,
} as ComponentMeta<typeof CUserInfo>;

export const UserInfo: ComponentStory<typeof CUserInfo> = (args: IUserInfoProps) => (
  <div style={{ width: '42px', height: '42px', margin: '0 auto' }}>
    <CUserInfo {...args} />
  </div>
);

UserInfo.args = {
  user: {
    name: '차영롱',
    teamName: 'MI 팀',
    email: 'leo.cha@netmarble.com',
  },
};
