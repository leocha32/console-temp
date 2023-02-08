import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getExecutiveSummary } from '$modules/report/research/api';
import { EXECUTIVE_SUMMARY } from '$modules/report/research/key';
import { RESEARCH_KEY } from '$modules/report/key';
import {
  IExecutiveSummaryRequestField,
  TResearchSummaryResponseDto,
} from '$modules/report/research/types';

export const useExecutiveSummary = (
  params: IExecutiveSummaryRequestField,
  options?: UseQueryOptions<TResearchSummaryResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<TResearchSummaryResponseDto, AxiosError<IApiError>>(
    [EXECUTIVE_SUMMARY, RESEARCH_KEY, params],
    () => getExecutiveSummary(params),
    options,
  );
};
