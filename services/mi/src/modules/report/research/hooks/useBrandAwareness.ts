import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getBrandAwareness } from '$modules/report/research/api';
import { BRAND_AWARENESS_KEY } from '$modules/report/research/key';
import { RESEARCH_KEY } from '$modules/report/key';
import { IBrandAwarenessParams, IBrandAwareness } from '$modules/report/research/types';

export const useBrandAwareness = (
  params: IBrandAwarenessParams,
  options?: UseQueryOptions<IBrandAwareness, AxiosError<IApiError>>,
) => {
  return useQuery<IBrandAwareness, AxiosError<IApiError>>(
    [RESEARCH_KEY, BRAND_AWARENESS_KEY, params],
    () => getBrandAwareness(params),
    options,
  );
};
