import api from '$utils/api';
import { IAccountCombinationResponseDto, IIAccountOwnershipParams } from './types';

export async function getAccountStatusHoldingCombine(
  params: IIAccountOwnershipParams,
): Promise<IAccountCombinationResponseDto> {
  const { data } = await api({
    url: `v2/api/console/report/account/combination`,
    method: 'get',
    params,
  });
  return data;
}
