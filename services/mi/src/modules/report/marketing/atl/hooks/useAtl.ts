import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getAtl } from '../api';
import { MARKETING_ATL_KEY } from '../key';
import { MARKETING_KEY } from '$modules/report/key';
import { IMarketingATLResponseDto, IAtlParams } from '../types';

export const useAtl = (
  params: IAtlParams,
  options?: UseQueryOptions<IMarketingATLResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IMarketingATLResponseDto, AxiosError<IApiError>>(
    [MARKETING_KEY, MARKETING_ATL_KEY, params],
    () => getAtl(params),
    {
      initialData: {
        atlMediaCostStatus: {
          monthlyCostByMedia: [],
          monthlyCostByProductGroup: [],
          shareByCompanies: [],
        },
        atlMediaPerformanceStatus: {
          r3grp: {
            r3: 0,
            grp: 0,
          },
          performanceByMedia: [],
        },
        atlMediaCostByCompanyStatus: { mediaCostByCompanies: [] },
      },
      ...options,
    },
  );
};
