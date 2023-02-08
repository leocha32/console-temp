import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getUser } from '../api';
import { USER_KEY } from '../key';
import { IUser } from '../type';

export const useUser = (
  { email, authLocation }: { email: string; authLocation: boolean },
  options?: UseQueryOptions<IUser, AxiosError<IApiError>>,
) => {
  return useQuery<IUser, AxiosError<IApiError>>(
    [USER_KEY, email, authLocation],
    () => getUser(email),
    options,
  );
};
