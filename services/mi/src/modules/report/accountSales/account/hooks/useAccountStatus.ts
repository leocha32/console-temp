import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAccountStatus } from '../api';
import { ACCOUNT_STATUS } from '../key';
import { ACCOUNT_SALES_KEY } from '$modules/report/key';
import { IAccountStatusParams, IAccountStatusResponseDto } from '../types';

export const useAccountStatus = (
  params: IAccountStatusParams,
  options?: UseQueryOptions<IAccountStatusResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IAccountStatusResponseDto, AxiosError<IApiError>>(
    [ACCOUNT_SALES_KEY, ACCOUNT_STATUS, params],
    () => getAccountStatus(params),
    {
      ...options,
    },
  );
};
