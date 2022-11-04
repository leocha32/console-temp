import api from '$utils/api';
import { IBrandAwareness, IBrandAwarenessParams } from './types';

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
