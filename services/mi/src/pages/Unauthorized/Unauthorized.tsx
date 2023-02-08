import React, { useMemo, useCallback } from 'react';
import { InfoLayout, VariantType, LandingLayout } from '$components/Layout';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '$modules/auth';
import { useFirebase } from '$utils/hooks';
import loginUser from '$recoils/user/atom';

const Unauthorized = () => {
  const { logout } = useFirebase();
  const navigate = useNavigate();
  const user = useRecoilValue(loginUser);

  const { data: profile } = useUserProfile(
    {
      userId: user?.employeeId || '',
    },
    { enabled: !!user },
  );

  const handleClickLogo = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const headerProps = useMemo(
    () => ({
      onClick: handleClickLogo,
      userInfo: {
        user: {
          name: user?.name || '',
          teamName: user?.teamName || '',
          email: user?.email ?? '',
          img: profile,
        },
        handleClick: logout,
      },
    }),
    [user, handleClickLogo, profile, logout],
  );

  return (
    <LandingLayout headerProps={headerProps}>
      <InfoLayout
        title={'권한이 없습니다.'}
        description={{
          variant: VariantType.ERROR,
          message: <>관리자에게 문의하세요.</>,
        }}
      />
    </LandingLayout>
  );
};

export default Unauthorized;
