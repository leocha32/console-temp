import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAccountStatusHoldingCombine } from '../api';
import { ACCOUNT_HOLING_COMBINE_KEY } from '../key';
import { ACCOUNT_SALES_KEY } from '$modules/report/key';
import { IIAccountOwnershipParams, IAccountCombinationResponseDto } from '../types';

export const useAccountHoldingCombine = (
  params: IIAccountOwnershipParams,
  options?: UseQueryOptions<IAccountCombinationResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IAccountCombinationResponseDto, AxiosError<IApiError>>(
    [ACCOUNT_SALES_KEY, ACCOUNT_HOLING_COMBINE_KEY, params],
    () => getAccountStatusHoldingCombine(params),
    {
      ...options,
    },
  );
};
