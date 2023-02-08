import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAccountStatus } from '$modules/report/accountSales/api';
import { ACCOUNT_STATUS } from '$modules/report/accountSales/key';
import { ACCOUNT_SALES_KEY } from '$modules/report/key';
import {
  IAccountStatusRequestParams,
  TAccountStatusResponseDto,
} from '$modules/report/accountSales/types';

export const useAccountStatus = (
  params: IAccountStatusRequestParams,
  options?: UseQueryOptions<TAccountStatusResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<TAccountStatusResponseDto, AxiosError<IApiError>>(
    [ACCOUNT_SALES_KEY, ACCOUNT_STATUS],
    () => getAccountStatus(params),
    {
      ...options,
    },
  );
};
