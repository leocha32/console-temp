import {
  auth as firebaseAuth,
  getIdToken,
  provider,
  signInWithPopup,
} from '$utils/firebase';
import { useRecoilState, useResetRecoilState } from 'recoil';
import user from '$recoils/user';
import { useNavigate } from 'react-router-dom';

export const useFirebase = () => {
  const AUTH = firebaseAuth;
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState(user);
  const resetLoginUser = useResetRecoilState(user);

  const getUser = () => {
    return AUTH.currentUser;
  };

  const getToken = async (user, forceRefresh: boolean) => {
    return await getIdToken(user, forceRefresh);
  };

  const setToken = async () => {
    AUTH.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('user있음', user);
        setLoginUser({
          email: user?.email ?? '',
        });
      } else {
        resetLoginUser();
      }
    });
  };

  const login = () => {
    if (loginUser.email === '') {
      signInWithPopup(AUTH, provider).then(() => {
        setToken();
      });
    }
  };

  // const currentUser = firebaseAuth.currentUser
  // if(currentUser){
  // await getIdToken(currentUser);
  // }
  // onAuthStateChanged(firebaseAuth, async (user) => {
  //   if (user) {
  //     console.log(user);
  //     const token = await getIdToken(user);
  //     setAuthState({
  //       token,
  //       user: { email: user?.email ?? '' },
  //       loginState: true,
  //     });
  //   }
  //   if (!loginState) {
  //     signInWithPopup(firebaseAuth, provider);
  //   }
  // });
  // onAuthStateChanged(firebaseAuth, async (user) => {
  //   if (user) {
  //     const token = await getIdToken(user);
  //
  //     setAuthState({
  //       token,
  //       user: { email: user?.email ?? '' },
  //       loginState: true,
  //     });
  //   } else (!loginState) {
  //     signInWithPopup(firebaseAuth, provider);
  //   }
  // })
  const logout = () => {
    resetLoginUser();
    AUTH.signOut();
    navigate('/logout');
  };

  return { login, logout, setToken, getUser, getToken };
};
