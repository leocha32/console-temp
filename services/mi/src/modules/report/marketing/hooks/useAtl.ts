import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAtl } from '$modules/report/marketing/api';
import { MARKETING_ATL_KEY } from '$modules/report/marketing/key';
import { MARKETING_KEY } from '$modules/report/key';
import {
  TMarketingATLResponseDto,
  IAtlRequestParams,
} from '$modules/report/marketing/types';

export const useAtl = (
  params: IAtlRequestParams,
  options?: UseQueryOptions<TMarketingATLResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<TMarketingATLResponseDto, AxiosError<IApiError>>(
    [MARKETING_KEY, MARKETING_ATL_KEY],
    () => getAtl(params),
    options,
  );
};
