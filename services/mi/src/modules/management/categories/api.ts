import api from '$utils/api';
import { ICategorySummary } from '$modules/management/categories/type';

export async function getCategories(): Promise<ICategorySummary[]> {
  const { data } = await api.get(`/v2/api/console/management/category/summaries`);
  return data.categories;
}
