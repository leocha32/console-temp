import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { getDepartmentInfo } from '../api';
import { DEPARTMENT_INFO_KEY } from '../key';
import { IDepartmentInfoResponse } from '../type';

export const useDepartmentInfo = (
  deptId: string,
  options?: UseQueryOptions<IDepartmentInfoResponse, AxiosError<IApiError>>,
) => {
  return useQuery<IDepartmentInfoResponse, AxiosError<IApiError>>(
    [DEPARTMENT_INFO_KEY],
    () => getDepartmentInfo(deptId),
    options,
  );
};
