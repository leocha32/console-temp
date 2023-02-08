import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { IKeywordAnalysisDownloadParams } from '$modules/report/marketing/types';
import { keywordAnalysisDownloadExcel } from '$modules/report/marketing/api';

export const useKeywordAnalysisDownloadExcel = () => {
  return useMutation<void, AxiosError<IApiError>, IKeywordAnalysisDownloadParams>(
    (params: IKeywordAnalysisDownloadParams) => keywordAnalysisDownloadExcel(params),
  );
};
