import api from 'utils/api';
import { IExecutiveSummaryRequestField, IExecutiveSummaryResponseDto } from './types';

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
