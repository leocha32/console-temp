import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { downloadReport, IReportDownloadRequestParams } from '$modules/report/common';

export const useDownloadReport = () => {
  return useMutation<void, AxiosError<IApiError>, IReportDownloadRequestParams>(
    (params: IReportDownloadRequestParams) => downloadReport(params),
  );
};
