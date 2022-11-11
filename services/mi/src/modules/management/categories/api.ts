import api from '$utils/api';
import { ICategorySummary } from '$modules/management/categories/type';

export async function getCategories(): Promise<ICategorySummary[]> {
  const { data } = await api({
    url: `/v2/api/console/management/category/summaries`,
    method: 'get',
  });
  return data.categories;
}
