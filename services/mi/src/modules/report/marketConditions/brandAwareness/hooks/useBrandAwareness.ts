import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getBrandAwareness } from '../api';
import { BRAND_AWARENESS_KEY } from '../key';
import { MARKET_CONDITION_KEY } from '$modules/report/key';
import { IBrandAwarenessParams, IBrandAwareness } from '../types';

export const useBrandAwareness = (
  params: IBrandAwarenessParams,
  options?: UseQueryOptions<IBrandAwareness, AxiosError<IApiError>>,
) => {
  return useQuery<IBrandAwareness, AxiosError<IApiError>>(
    [MARKET_CONDITION_KEY, BRAND_AWARENESS_KEY, params],
    () => getBrandAwareness(params),
    options,
  );
};
