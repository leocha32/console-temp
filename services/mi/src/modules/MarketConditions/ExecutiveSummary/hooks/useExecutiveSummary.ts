import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from 'types/api-error';
import { getExecutiveSummary } from '../api';
import { EXECUTIVE_SUMMARY } from '../key';
import { MARKET_CONDITION_KEY } from '../../key';
import { IExecutiveSummaryRequestField, IExecutiveSummaryResponseDto } from '../types';

export const useExecutiveSummary = (
  params: IExecutiveSummaryRequestField,
  options?: UseQueryOptions<IExecutiveSummaryResponseDto, AxiosError<IApiError>>,
) => {
  return useQuery<IExecutiveSummaryResponseDto, AxiosError<IApiError>>(
    [EXECUTIVE_SUMMARY, MARKET_CONDITION_KEY, params],
    () => getExecutiveSummary(params),
    options,
  );
};
