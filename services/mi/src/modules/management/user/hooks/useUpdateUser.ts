import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { IUser, TUserResponseDto } from '../type';
import { updateUser } from '../api';
import { USER_KEY } from '../key';

export const useUpdateUser = (
  options?: UseMutationOptions<TUserResponseDto, AxiosError<IApiError>, IUser>,
) => {
  const queryClient = useQueryClient();
  return useMutation<TUserResponseDto, AxiosError<IApiError>, IUser>(
    (user: IUser) => updateUser(user),
    {
      ...options,
      onSuccess: (...data) => {
        queryClient.invalidateQueries([USER_KEY]);
        if (options?.onSuccess) {
          options.onSuccess(...data);
        }
      },
    },
  );
};
