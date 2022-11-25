import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getExecutiveSummary } from '$modules/report/research/api';
import { EXECUTIVE_SUMMARY } from '$modules/report/research/key';
import { RESEARCH_KEY } from '$modules/report/key';
import {
  IExecutiveSummaryRequestField,
  IExecutiveSummaryResponseDto,
} from '$modules/report/research/types';

export const useExecutiveSummary = (
  params: IExecutiveSummaryRequestField,
  options?: UseQueryOptions<IExecutiveSummaryResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IExecutiveSummaryResponseDto, AxiosError<IApiError>>(
    [EXECUTIVE_SUMMARY, RESEARCH_KEY, params],
    () => getExecutiveSummary(params),
    {
      initialData: {
        marketShareSummary: {
          description: '',
          cowayMarketShare: [],
          productPenetration: [],
          marketShareRank: [],
          researchReportFileUrl: undefined,
        },
        salesVolumeSummary: {
          description: '',
          cowaySales: [],
          brandShareRank: [],
          researchReportFileUrl: undefined,
        },
        brandAwarenessSummary: {
          description: '',
          cowayBrandAwareness: [],
          topOfMindRank: [],
          researchReportFileUrl: undefined,
        },
      },
      ...options,
    },
  );
};
