import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getUserProfile } from '../api';
import { USER_PROFILE_KEY } from '../key';
import { IProfileParams } from '../type';

export const useUserProfile = (
  param: IProfileParams,
  options?: UseQueryOptions<Blob, AxiosError<IApiError>>,
) => {
  return useQuery<Blob, AxiosError<IApiError>>(
    [USER_PROFILE_KEY],
    () => getUserProfile(param),
    {
      ...options,
      onError: (e) => {
        console.log(e);
      },
    },
  );
};
