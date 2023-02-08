import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserInfo as CUserInfo, TUserInfoProps } from 'components/Organisms/UserInfo_old';

export default {
  title: 'Atoms/UserInfo_old',
  component: CUserInfo,
} as ComponentMeta<typeof CUserInfo>;

export const UserInfo: ComponentStory<typeof CUserInfo> = (args: TUserInfoProps) => (
  <CUserInfo {...args} />
);

UserInfo.args = {
  name: '차영롱',
  teamName: 'MI 팀',
  email: 'leo.cha@netmarble.com',
};
