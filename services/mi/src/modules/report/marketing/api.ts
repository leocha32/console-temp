import api from '$utils/api';
import {
  TMarketingCostAndEfficiencyStatusResponseDto,
  IMarketingCostsEfficiencyParams,
  IMarketingCostsEfficiencyRequestParams,
  TMarketingATLResponseDto,
  IAtlRequestParams,
  IAtlParams,
  TMarketingKeywordAnalysisResponseDto,
  IKeywordAnalysisRequestParams,
  IKeywordAnalysisDownloadParams,
  TMarketingDigitalCampaignPerformanceResponseDto,
  IDigitalRequestParams,
  TMarketingDigitalCampaignStatusResponseDto,
} from './types';
import { getFileNameAndDownloadFile } from '$utils/utils';

export async function getMarketingCostsEfficiency(
  params: IMarketingCostsEfficiencyRequestParams,
): Promise<TMarketingCostAndEfficiencyStatusResponseDto> {
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
): Promise<TMarketingATLResponseDto> {
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

export async function getKeywordAnalysis(
  params: IKeywordAnalysisRequestParams,
): Promise<TMarketingKeywordAnalysisResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/marketing/keyword-analysis`,
    method: 'get',
    params,
  });
  return data;
}

export async function keywordAnalysisDownloadExcel(
  params: IKeywordAnalysisDownloadParams,
) {
  const result = await api({
    url: `/v2/api/console/report/marketing/keyword-analysis/details/excel`,
    method: 'get',
    responseType: 'blob',
    params,
  });
  getFileNameAndDownloadFile(result);
}

export async function getDigital(
  params: IDigitalRequestParams,
  reqType: 'performance' | 'status',
): Promise<
  TMarketingDigitalCampaignPerformanceResponseDto &
    TMarketingDigitalCampaignStatusResponseDto
> {
  const { data } = await api({
    url: `/v2/api/console/report/marketing/digital/campaign/${reqType}`,
    method: 'get',
    params,
  });
  return data;
}
