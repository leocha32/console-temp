import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getBrandAwareness } from '../api';
import { MARKETING_COSTS_EFFICIENCY_KEY } from '../key';
import { MARKETING_KEY } from '$modules/report/key';
import { IBrandAwarenessParams, IBrandAwareness } from '../types';

export const useMarketingCostsEfficiency = (
  params: IBrandAwarenessParams,
  options?: UseQueryOptions<IBrandAwareness, AxiosError<IApiError>>,
) => {
  return useQuery<IBrandAwareness, AxiosError<IApiError>>(
    [MARKETING_KEY, MARKETING_COSTS_EFFICIENCY_KEY, params],
    () => getBrandAwareness(params),
    options,
  );
};
