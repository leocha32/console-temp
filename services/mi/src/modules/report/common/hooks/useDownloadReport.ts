import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { IReportDownloadRequestParams } from '$modules/report/common/types';
import { downloadReport } from '$modules/report/common/api';

export const useDownloadReport = () => {
  return useMutation<void, AxiosError<IApiError>, IReportDownloadRequestParams>(
    (params: IReportDownloadRequestParams) => downloadReport(params),
  );
};
