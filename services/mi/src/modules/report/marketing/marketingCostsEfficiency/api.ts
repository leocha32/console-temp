import api from '$utils/api';
import {
  IMarketingCostAndEfficiencyStatusResponseDto,
  IMarketingCostsEfficiencyParams,
} from './types';

export async function getMarketingCostsEfficiency(
  params: IMarketingCostsEfficiencyParams,
): Promise<IMarketingCostAndEfficiencyStatusResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/report/marketing/cost-efficiency`,
    method: 'get',
    params,
  });
  return data;
}
