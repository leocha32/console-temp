import { familySector } from '$recoils/categories';
import { useRecoilValue } from 'recoil';

export interface IUseSortFamilyProps<T> {
  category: string;
  data: T[];
  key: string;
}
export const useSortFamily = <T extends object>({
  category,
  data,
  key,
}: IUseSortFamilyProps<T>) => {
  const familyOptions = useRecoilValue(familySector({ category, notOption: true }));

  return [...data].sort((a, b) => {
    const indexA = familyOptions.findIndex((family) => family === a[key]);
    const indexB = familyOptions.findIndex((family) => family === b[key]);
    return indexA - indexB;
  });
};
