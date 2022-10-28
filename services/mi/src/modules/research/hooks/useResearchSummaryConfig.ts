import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from 'types/api-error';
import { getResearchSummaryConfig } from '../api';
import { RESEARCH_KEY, RESEARCH_SUMMARY_CONFIG_KEY } from '../key';
import { IResearchSummaryRequestField, IResearchSummaryResponseDto } from '../types';

export const useResearchSummaryConfig = (
  params: IResearchSummaryRequestField,
  options?: UseQueryOptions<IResearchSummaryResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IResearchSummaryResponseDto, AxiosError<IApiError>>(
    [RESEARCH_KEY, RESEARCH_SUMMARY_CONFIG_KEY, params],
    () => getResearchSummaryConfig(params),
    options,
  );
};
