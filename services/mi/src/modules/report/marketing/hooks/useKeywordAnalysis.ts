import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import {
  IKeywordAnalysisRequestParams,
  TMarketingKeywordAnalysisResponseDto,
} from '$modules/report/marketing/types';
import { getKeywordAnalysis } from '$modules/report/marketing/api';
import { MARKETING_KEYWORD_ANALYSIS_KEY } from '$modules/report/marketing/key';
import { MARKETING_KEY } from '$modules/report/key';

export const useKeywordAnalysis = (
  params: IKeywordAnalysisRequestParams,
  options?: UseQueryOptions<TMarketingKeywordAnalysisResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<TMarketingKeywordAnalysisResponseDto, AxiosError<IApiError>>(
    [MARKETING_KEY, MARKETING_KEYWORD_ANALYSIS_KEY],
    () => getKeywordAnalysis(params),
    options,
  );
};
