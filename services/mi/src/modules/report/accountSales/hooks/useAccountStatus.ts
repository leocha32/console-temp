import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAccountStatus } from '$modules/report/accountSales/api';
import { ACCOUNT_STATUS } from '$modules/report/accountSales/key';
import { ACCOUNT_SALES_KEY } from '$modules/report/key';
import {
  IAccountStatusRequestParams,
  IAccountStatusResponseDto,
} from '$modules/report/accountSales/types';

export const useAccountStatus = (
  params: IAccountStatusRequestParams,
  options?: UseQueryOptions<IAccountStatusResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IAccountStatusResponseDto, AxiosError<IApiError>>(
    [ACCOUNT_SALES_KEY, ACCOUNT_STATUS],
    () => getAccountStatus(params),
    {
      ...options,
    },
  );
};
