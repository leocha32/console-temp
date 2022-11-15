import api from '$utils/api';
import { IAccountOwnershipResponseDto, IIAccountOwnershipParams } from './types';

export async function getMarketingCostsEfficiency(
  params: IIAccountOwnershipParams,
): Promise<IAccountOwnershipResponseDto> {
  const { data } = await api({
    url: `v2/api/console/report/account/ownership`,
    method: 'get',
    params,
  });
  return data;
}
