import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { accountStatusDownloadExcel } from '$modules/report/accountSales/api';
import { IAccountStatusParams } from '$modules/report/accountSales/types';

export const useAccountStatusDownloadExcel = () => {
  return useMutation<void, AxiosError<IApiError>, IAccountStatusParams>(
    (params: IAccountStatusParams) => accountStatusDownloadExcel(params),
  );
};
