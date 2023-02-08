import React from 'react';
import { InfoLayout, VariantType, LandingLayout } from '$components/Layout';
import { useFirebase } from '$utils/hooks';

const Logout = () => {
  const { login } = useFirebase();
  return (
    <LandingLayout
      headerProps={{
        userInfo: {
          handleClick: login,
        },
      }}
    >
      <InfoLayout
        title={'로그아웃 되었습니다.'}
        description={{
          variant: VariantType.INFO,
          message: (
            <>
              Mi Platform에서 로그아웃 되었습니다.
              <br /> 오른쪽 위, 프로필 버튼 내의 로그인 버튼을 누르면 다시 로그인 할 수
              있습니다.
            </>
          ),
        }}
      />
    </LandingLayout>
  );
};

export default Logout;
