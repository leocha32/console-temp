import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getSelectableItems } from '$modules/report/research/api';
import { SELECTABLE_ITEMS_KEY } from '$modules/report/research/key';
import { RESEARCH_KEY } from '$modules/report/key';
import { TResearchSelectableItem } from '$modules/report/research/types';

export const useSelectableItems = (
  options?: UseQueryOptions<TResearchSelectableItem[], AxiosError<IApiError>>,
) => {
  return useQuery<TResearchSelectableItem[], AxiosError<IApiError>>(
    [RESEARCH_KEY, SELECTABLE_ITEMS_KEY],
    () => getSelectableItems(),
    options,
  );
};
