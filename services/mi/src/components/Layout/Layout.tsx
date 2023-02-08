import React, { useCallback, useMemo } from 'react';
import { Layout as CLayout } from 'mi-ui';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import menu from 'recoils/menu';
import { recentMenuSelector } from 'recoils/recentMenu';
import { useUserProfile } from '$modules/auth';
import loginUser from '$recoils/user';
import { useFirebase } from '$utils/hooks';
import { Header } from './components';
import { getAccessibleMenu } from '$utils/userTreeUtils';

export const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useFirebase();
  const setRecentMenu = useSetRecoilState(recentMenuSelector);
  const user = useRecoilValue(loginUser);

  const menus = useMemo(
    () => getAccessibleMenu(user?.accessibleUri || ''),
    [user?.accessibleUri],
  );

  const { data: profile } = useUserProfile(
    {
      userId: user?.employeeId || '',
    },
    { enabled: !!user?.employeeId },
  );

  const handleClickLogo = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onClickMenu = useCallback(
    (params) => {
      setRecentMenu(params);
    },
    [setRecentMenu],
  );

  const headerProps = useMemo(
    () => ({
      onClick: handleClickLogo,
      userInfo: {
        user: {
          email: user?.email ?? '',
          employeeId: user?.employeeId ?? '',
          teamName: user?.teamName ?? '',
          name: user?.name ?? '',
          img: profile,
        },
        handleClick: logout,
      },
    }),
    [handleClickLogo, profile, logout, user],
  );

  return (
    <>
      <CLayout
        menuStatusHook={useRecoilState(menu)}
        headerProps={headerProps}
        menu={menus}
        header={Header}
        onClickMenu={onClickMenu}
      />
    </>
  );
};
