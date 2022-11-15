import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getMarketingCostsEfficiency } from '../api';
import { MARKETING_COSTS_EFFICIENCY_KEY } from '../key';
import { MARKETING_KEY } from '$modules/report/key';
import {
  IMarketingCostsEfficiencyParams,
  IMarketingCostAndEfficiencyStatusResponseDto,
} from '../types';

export const useMarketingCostsEfficiency = (
  params: IMarketingCostsEfficiencyParams,
  options?: UseQueryOptions<
    IMarketingCostAndEfficiencyStatusResponseDto,
    AxiosError<IApiError>
  >,
) => {
  return useQuery<IMarketingCostAndEfficiencyStatusResponseDto, AxiosError<IApiError>>(
    [MARKETING_KEY, MARKETING_COSTS_EFFICIENCY_KEY, params],
    () => getMarketingCostsEfficiency(params),
    {
      initialData: {
        marketingCostStatus: {
          marketingCosts: [],
          marketingCostBySelectedItems: [],
          marketingCostByMonths: [],
          marketingCostCompare: undefined,
        },
        marketingEfficiencyStatus: {
          marketingEfficiency: {
            cpp: 0,
            percentOfSales: 0,
          },
          marketingEfficiencyByProductGroups: [],
          marketingEfficiencyByProducts: [],
          marketingEfficiencyCompares: [],
          marketingEfficiencyByMonths: [],
        },
      },
      ...options,
    },
  );
};
