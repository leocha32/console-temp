import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getMarketShare } from '../api';
import { MARKET_SHARE_KEY } from '../key';
import { MARKET_CONDITION_KEY } from '../../key';
import { TMarketShareParams, IMarketShare } from '../types';

export const useMarketShare = (
  params: TMarketShareParams,
  options?: UseQueryOptions<IMarketShare, AxiosError<IApiError>>,
) => {
  return useQuery<IMarketShare, AxiosError<IApiError>>(
    [MARKET_CONDITION_KEY, MARKET_SHARE_KEY, params],
    () => getMarketShare(params),
    options,
  );
};
