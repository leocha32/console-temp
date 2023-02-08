import { Avatar } from '@mui/material';
import { Card as CCard } from '../Atoms';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import profile from '../../assets/images/profile.jpg';

const Card = styled(CCard)(
  {
    display: 'flex',
    padding: '10px',
    fontSize: '0.9rem',
  },
  ({ width }: { width: number; theme?: Theme }) => ({
    width: width,
    '& .MuiAvatar-root': {
      marginRight: '10px',
    },
  }),
);

export type TUserInfoProps = {
  name: string;
  teamName?: string;
  email?: string;
  width?: number;
};

export const UserInfo = ({ name, teamName, email = '', width = 200 }: TUserInfoProps) => {
  return (
    <Card width={width}>
      <Avatar src={profile}></Avatar>
      {`${name} ( ${teamName} )`}
      <br />
      {email.length > 24 ? email?.slice(0, 20) + '....' : email}
    </Card>
  );
};
