import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { IAtlParams } from '$modules/report/marketing/types';
import { atlDownloadExcel } from '$modules/report/marketing/api';

export const useAtlDownloadExcel = () => {
  return useMutation<void, AxiosError<IApiError>, IAtlParams>((params: IAtlParams) =>
    atlDownloadExcel(params),
  );
};
