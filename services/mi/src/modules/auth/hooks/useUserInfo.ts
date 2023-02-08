import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getUserInfo } from '../api';
import { USER_INFO_KEY } from '../key';
import { IUSerInfoResponse } from '../type';

export const useUserInfo = (
  email: string,
  options?: UseQueryOptions<IUSerInfoResponse, AxiosError<IApiError>>,
) => {
  return useQuery<IUSerInfoResponse, AxiosError<IApiError>>(
    [USER_INFO_KEY, email],
    () => getUserInfo(email),
    options,
  );
};
