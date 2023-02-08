import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getCategories } from '../api';
import { CATEGORIES_KEY } from '../key';
import { TCategorySummary } from '$modules/management/categories/type';

export const useCategories = (
  options?: UseQueryOptions<TCategorySummary[], AxiosError<IApiError>>,
) => {
  return useQuery<TCategorySummary[], AxiosError<IApiError>>(
    [CATEGORIES_KEY],
    () => getCategories(),
    options,
  );
};
