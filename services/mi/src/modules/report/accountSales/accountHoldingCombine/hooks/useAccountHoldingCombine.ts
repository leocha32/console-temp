import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getMarketingCostsEfficiency } from '../api';
import { ACCOUNT_HOLING_COMBINE_KEY } from '../key';
import { ACCOUNT_SALES_KEY } from '$modules/report/key';
import { IIAccountOwnershipParams, IAccountOwnershipResponseDto } from '../types';

export const useAccountHoldingCombine = (
  params: IIAccountOwnershipParams,
  options?: UseQueryOptions<IAccountOwnershipResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IAccountOwnershipResponseDto, AxiosError<IApiError>>(
    [ACCOUNT_SALES_KEY, ACCOUNT_HOLING_COMBINE_KEY, params],
    () => getMarketingCostsEfficiency(params),
    {
      ...options,
    },
  );
};
