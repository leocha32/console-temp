import api from '$utils/api';
import { IMarketingATLResponseDto, IAtlParams } from './types';

export async function getAtl(params: IAtlParams): Promise<IMarketingATLResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/marketing/atl`,
    method: 'get',
    params,
  });
  return data;
}
