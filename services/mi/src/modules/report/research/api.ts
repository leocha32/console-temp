import api from '$utils/api';
import {
  ISalesVolumeParams,
  ISalesVolume,
  IBrandAwareness,
  IBrandAwarenessParams,
  TMarketShareParams,
  IMarketShare,
  IExecutiveSummaryRequestField,
  IExecutiveSummaryResponseDto,
  IResearchSelectableItem,
} from './types';

export async function getSalesVolume(params: ISalesVolumeParams): Promise<ISalesVolume> {
  const { data } = await api({
    url: `/v2/api/console/report/research/sales-volume`,
    method: 'get',
    params,
  });
  return data.salesVolume;
}

export async function getMarketShare(params: TMarketShareParams): Promise<IMarketShare> {
  const { data } = await api({
    url: `/v2/api/console/report/research/market-share`,
    method: 'get',
    params,
  });
  return data.marketShare;
}

export async function getExecutiveSummary(
  params: IExecutiveSummaryRequestField,
): Promise<IExecutiveSummaryResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/research/summary`,
    method: 'get',
    params,
  });
  return data;
}

export async function getBrandAwareness(
  params: IBrandAwarenessParams,
): Promise<IBrandAwareness> {
  const { data } = await api({
    url: `/v2/api/console/report/research/brand-awareness`,
    method: 'get',
    params,
  });
  return data.brandAwareness;
}

export async function getSelectableItems(): Promise<IResearchSelectableItem[]> {
  const { data } = await api({
    url: `/v2/api/console/report/research/selectable-items`,
    method: 'get',
  });
  return data.researchSelectableItems;
}
