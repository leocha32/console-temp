import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getMarketShare } from '$modules/report/research/api';
import { MARKET_SHARE_KEY } from '$modules/report/research/key';
import { RESEARCH_KEY } from '$modules/report/key';
import { TMarketShareParams, TMarketShare } from '$modules/report/research/types';

export const useMarketShare = (
  params: TMarketShareParams,
  options?: UseQueryOptions<TMarketShare, AxiosError<IApiError>>,
) => {
  return useQuery<TMarketShare, AxiosError<IApiError>>(
    [RESEARCH_KEY, MARKET_SHARE_KEY, params],
    () => getMarketShare(params),
    options,
  );
};
