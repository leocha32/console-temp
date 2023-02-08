import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAccountStatusHoldingCombine } from '$modules/report/accountSales/api';
import { ACCOUNT_HOLING_COMBINE_KEY } from '$modules/report/accountSales/key';
import { ACCOUNT_SALES_KEY } from '$modules/report/key';
import {
  IIAccountOwnershipParams,
  TAccountCombinationResponseDto,
} from '$modules/report/accountSales/types';

export const useAccountHoldingCombine = (
  params: IIAccountOwnershipParams,
  options?: UseQueryOptions<TAccountCombinationResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<TAccountCombinationResponseDto, AxiosError<IApiError>>(
    [ACCOUNT_SALES_KEY, ACCOUNT_HOLING_COMBINE_KEY],
    () => getAccountStatusHoldingCombine(params),
    {
      ...options,
    },
  );
};
