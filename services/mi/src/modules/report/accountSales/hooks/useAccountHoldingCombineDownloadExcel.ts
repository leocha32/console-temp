import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { accountStatusHoldingCombineDownloadExcel } from '$modules/report/accountSales/api';
import { IAccountCombinationParams } from '$modules/report/accountSales/types';

export const useAccountHoldingCombineDownloadExcel = () => {
  return useMutation<void, AxiosError<IApiError>, IAccountCombinationParams>(
    (params: IAccountCombinationParams) =>
      accountStatusHoldingCombineDownloadExcel(params),
  );
};
