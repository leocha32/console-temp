import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getUsers } from '../api';
import { USER_KEY } from '../key';
import { IUser } from '../type';

export const useUsers = (options?: UseQueryOptions<IUser[], AxiosError<IApiError>>) => {
  return useQuery<IUser[], AxiosError<IApiError>>([USER_KEY], () => getUsers(), options);
};
