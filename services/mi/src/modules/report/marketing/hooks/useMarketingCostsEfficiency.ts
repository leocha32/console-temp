import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import {
  IMarketingCostsEfficiencyRequestParams,
  IMarketingCostAndEfficiencyStatusResponseDto,
} from '$modules/report/marketing/types';
import { getMarketingCostsEfficiency } from '$modules/report/marketing/api';
import { MARKETING_COSTS_EFFICIENCY_KEY } from '$modules/report/marketing/key';

import { MARKETING_KEY } from '$modules/report/key';

export const useMarketingCostsEfficiency = (
  params: IMarketingCostsEfficiencyRequestParams,
  options?: UseQueryOptions<
    IMarketingCostAndEfficiencyStatusResponseDto,
    AxiosError<IApiError>
  >,
) => {
  return useQuery<IMarketingCostAndEfficiencyStatusResponseDto, AxiosError<IApiError>>(
    [MARKETING_KEY, MARKETING_COSTS_EFFICIENCY_KEY],
    () => getMarketingCostsEfficiency(params),
    options,
  );
};
