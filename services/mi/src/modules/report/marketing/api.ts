import api from '$utils/api';
import {
  IMarketingCostAndEfficiencyStatusResponseDto,
  IMarketingCostsEfficiencyParams,
  IMarketingCostsEfficiencyRequestParams,
  IMarketingATLResponseDto,
  IAtlRequestParams,
  IAtlParams,
} from './types';
import { getFileNameAndDownloadFile } from '$utils/utils';

export async function getMarketingCostsEfficiency(
  params: IMarketingCostsEfficiencyRequestParams,
): Promise<IMarketingCostAndEfficiencyStatusResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/marketing/cost-efficiency`,
    method: 'get',
    params,
  });
  return data;
}

export async function costsEfficiencyDownloadExcel(
  params: IMarketingCostsEfficiencyParams,
) {
  const result = await api({
    url: `/v2/api/console/report/marketing/cost-efficiency/details/excel`,
    method: 'get',
    responseType: 'blob',
    params,
  });
  getFileNameAndDownloadFile(result);
}

export async function getAtl(
  params: IAtlRequestParams,
): Promise<IMarketingATLResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/marketing/atl`,
    method: 'get',
    params,
  });
  return data;
}

export async function atlDownloadExcel(params: IAtlParams) {
  const result = await api({
    url: `/v2/api/console/report/marketing/atl/details/excel`,
    method: 'get',
    responseType: 'blob',
    params,
  });
  getFileNameAndDownloadFile(result);
}
