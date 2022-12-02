import { useCallback, useState } from 'react';
import { Button, IButtonProps } from 'mi-ui/src';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApiError } from '$types/api-error';

export interface IDownloadButtonProp<T> extends Omit<IButtonProps, 'onClick'> {
  hook: UseMutationResult<void, AxiosError<IApiError, any>, T, unknown>;
  params: T;
  category: string;
  onClick?: IButtonProps['onClick'];
}

export const DownloadButton = <T extends object>({
  onClick,
  hook,
  params,
  category,
  ...props
}: IDownloadButtonProp<T>) => {
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(
    (e) => {
      setLoading(true);
      hook.mutate(params, {
        onSettled: () => {
          setLoading(false);
        },
      });

      if (onClick instanceof Function) {
        onClick(e);
      }
    },
    [onClick, hook, params],
  );
  return <Button {...props} onClick={handleClick} showLoading={loading} />;
};
