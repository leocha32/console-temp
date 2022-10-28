import api from 'utils/api';
import { IResearchSummaryRequestField, IResearchSummaryResponseDto } from './types';

export async function getResearchSummaryConfig(
  params: IResearchSummaryRequestField,
): Promise<IResearchSummaryResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/research/summary`,
    method: 'get',
    params,
  });
  return data;
}
