import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';
import { deleteUser } from '../api';
import { USER_KEY } from '../key';
import { TUserResponseDto } from '$modules/management/user';

export const useDeleteUser = (
  options?: UseMutationOptions<TUserResponseDto, AxiosError<IApiError>, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation<TUserResponseDto, AxiosError<IApiError>, string>(
    (email: string) => deleteUser(email),
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
