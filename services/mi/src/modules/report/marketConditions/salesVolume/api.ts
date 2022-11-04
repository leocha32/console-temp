import api from '$utils/api';
import { ISalesVolumeParams, ISalesVolume } from './types';

export async function getSalesVolume(params: ISalesVolumeParams): Promise<ISalesVolume> {
  const { data } = await api({
    url: `/v2/api/console/report/research/sales-volume`,
    method: 'get',
    params,
  });
  return data.salesVolume;
}
