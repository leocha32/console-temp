import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { IMarketingCostsEfficiencyParams } from '$modules/report/marketing/types';
import { costsEfficiencyDownloadExcel } from '$modules/report/marketing/api';
export const useCostEfficiencyDownloadExcel = () => {
  return useMutation<void, AxiosError<IApiError>, IMarketingCostsEfficiencyParams>(
    (params: IMarketingCostsEfficiencyParams) => costsEfficiencyDownloadExcel(params),
  );
};
