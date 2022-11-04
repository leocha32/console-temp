import api from '$utils/api';
import { TMarketShareParams, IMarketShare } from './types';

export async function getMarketShare(params: TMarketShareParams): Promise<IMarketShare> {
  const { data } = await api({
    url: `/v2/api/console/report/research/market-share`,
    method: 'get',
    params,
  });
  return data.marketShare;
}
