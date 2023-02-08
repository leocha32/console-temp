import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getDigital } from '$modules/report/marketing/api';
import { MARKETING_DIGITAL_KEY } from '$modules/report/marketing/key';
import { MARKETING_KEY } from '$modules/report/key';
import {
  TMarketingDigitalCampaignPerformanceResponseDto,
  IDigitalRequestParams,
  TMarketingDigitalCampaignStatusResponseDto,
} from '$modules/report/marketing/types';

export const useDigitalCampaign = (
  params: IDigitalRequestParams,
  reqType: 'performance' | 'status',
  options?: UseQueryOptions<
    TMarketingDigitalCampaignPerformanceResponseDto &
      TMarketingDigitalCampaignStatusResponseDto,
    AxiosError<IApiError>
  >,
) => {
  return useQuery<
    TMarketingDigitalCampaignPerformanceResponseDto &
      TMarketingDigitalCampaignStatusResponseDto,
    AxiosError<IApiError>
  >([MARKETING_KEY, MARKETING_DIGITAL_KEY], () => getDigital(params, reqType), options);
};
