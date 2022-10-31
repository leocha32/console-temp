import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from 'types/api-error';
import { getSalesVolume } from '../api';
import { SALES_VOLUME_KEY } from '../key';
import { MARKET_CONDITION_KEY } from '../../key';
import { ISalesVolumeParams, ISalesVolume } from '../types';

export const useSalesVolume = (
  params: ISalesVolumeParams,
  options?: UseQueryOptions<ISalesVolume, AxiosError<IApiError>>,
) => {
  return useQuery<ISalesVolume, AxiosError<IApiError>>(
    [MARKET_CONDITION_KEY, SALES_VOLUME_KEY, params],
    () => getSalesVolume(params),
    options,
  );
};
