import api from '$utils/api';
import { IAccountStatusParams, IAccountStatusResponseDto } from './types';

export async function getAccountStatus(
  params: IAccountStatusParams,
): Promise<IAccountStatusResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/account/status`,
    method: 'get',
    params,
  });
  return data;
}
