import api from '$utils/api';
import { TCategorySummary } from '$modules/management/categories/type';

export async function getCategories(): Promise<TCategorySummary[]> {
  const { data } = await api({
    url: `/v2/api/console/management/category/summaries`,
    method: 'get',
  });
  return data.categories;
}
