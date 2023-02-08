import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getSalesVolume } from '$modules/report/research/api';
import { SALES_VOLUME_KEY } from '$modules/report/research/key';
import { RESEARCH_KEY } from '$modules/report/key';
import { ISalesVolumeParams, TSalesVolume } from '$modules/report/research/types';

export const useSalesVolume = (
  params: ISalesVolumeParams,
  options?: UseQueryOptions<TSalesVolume, AxiosError<IApiError>>,
) => {
  return useQuery<TSalesVolume, AxiosError<IApiError>>(
    [RESEARCH_KEY, SALES_VOLUME_KEY, params],
    () => getSalesVolume(params),
    options,
  );
};
