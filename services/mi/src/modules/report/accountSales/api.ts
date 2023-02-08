import api from '$utils/api';
import {
  IAccountStatusParams,
  TAccountStatusResponseDto,
  IAccountStatusRequestParams,
  IAccountCombinationParams,
  TAccountCombinationResponseDto,
  IIAccountOwnershipParams,
} from './types';
import { getFileNameAndDownloadFile } from '$utils/utils';

export async function getAccountStatus(
  params: IAccountStatusRequestParams,
): Promise<TAccountStatusResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/account/status`,
    method: 'get',
    params,
  });
  return data;
}
export async function accountStatusDownloadExcel(params: IAccountStatusParams) {
  const result = await api({
    url: `/v2/api/console/report/account/details/excel`,
    method: 'get',
    responseType: 'blob',
    params,
  });
  getFileNameAndDownloadFile(result);
}

export async function getAccountStatusHoldingCombine(
  params: IIAccountOwnershipParams,
): Promise<TAccountCombinationResponseDto> {
  const { data } = await api({
    url: `v2/api/console/report/account/combination`,
    method: 'get',
    params,
  });
  return data;
}

export async function accountStatusHoldingCombineDownloadExcel(
  params: IAccountCombinationParams,
) {
  const result = await api({
    url: `/v2/api/console/report/account/combination/details/excel`,
    method: 'get',
    responseType: 'blob',
    params,
  });
  getFileNameAndDownloadFile(result);
}
