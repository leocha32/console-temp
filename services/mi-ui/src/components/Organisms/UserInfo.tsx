import React, { useState, useCallback } from 'react';
import { Avatar as MuiAvatar, Paper } from '@mui/material';
import { Tooltip, TTooltipProps, Button } from '../Atoms';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';

interface IUser {
  name: string;
  teamName: string;
  email: string;
  img?: Blob;
}
export interface IUserInfoProps {
  user?: IUser;
  placement?: TTooltipProps['placement'];
  handleClick?: () => void;
}

const Avatar = styled(MuiAvatar)(`
  border: 3px solid #fff;
  &:hover {
    border: 3px solid #a9a8a8
  }
`);
const TooltipWrap = styled.div`
  display: flex;
`;

const DetailWrap = styled(Paper)`
  width: 250px;
  height: 120px;
  z-index: 1501;
  right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoWrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_900};
  font-size: 14px;
`;

const nameStyle = css`
  font-size: 16px;
  font-weight: bold;
`;

const UserInfoDetail = ({ handleClick, user }: IUserInfoProps) => {
  const { email, teamName, name, img = new Blob() } = user as IUser;
  return (
    <DetailWrap>
      <InfoWrap>
        <Avatar src={URL.createObjectURL(img)} />
        <div>
          {name && <div css={nameStyle}>{`[${teamName}] ${name}`}</div>}
          <div>{email}</div>
        </div>
      </InfoWrap>
      <Button label={'로그아웃'} onClick={handleClick}>
        로그아웃
      </Button>
    </DetailWrap>
  );
};

const label = ({ name = '', teamName = ' ', email = '' }) => (
  <TooltipWrap>
    {name && <div>{`${name}[${teamName}]`}</div>}
    <div>{email}</div>
  </TooltipWrap>
);

export const UserInfo = (props: IUserInfoProps) => {
  const { user, placement = 'bottom-start', handleClick } = props;
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return user ? (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: 'relative' }}>
        <Tooltip
          componentsProps={{
            popper: { sx: { display: open ? 'none' : 'block' } },
          }}
          title={label(user)}
          placement={placement}
          arrow={false}
        >
          <Avatar
            src={URL.createObjectURL(user?.img ?? new Blob())}
            onClick={handleOpen}
          ></Avatar>
        </Tooltip>
        {open ? <UserInfoDetail {...props} /> : null}
      </Box>
    </ClickAwayListener>
  ) : (
    <Button label={'Log In'} onClick={handleClick} />
  );
};
