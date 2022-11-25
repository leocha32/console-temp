import React, { useCallback, useState } from 'react';
import { Alert, IAlertProps } from 'mi-ui';

export interface IUseAlertProps extends Omit<IAlertProps, 'text' | 'onClose' | 'open'> {
  onClose?: () => void;
  open?: boolean;
}

export default function useAlert({
  open: defaultOpen = false,
  onClose,
  title,
  ...props
}: IUseAlertProps) {
  const [isOpened, setBeOpened] = useState<boolean>(defaultOpen);
  const [alertText, setAlertText] = useState('');

  const open = useCallback(
    (text: string) => {
      setAlertText(text);
      setBeOpened(true);
    },
    [setBeOpened],
  );

  const close = useCallback(() => {
    if (onClose) onClose();
    setBeOpened(false);
  }, [onClose, setBeOpened]);

  const rendered = (
    <Alert title={title} text={alertText} open={isOpened} onClose={close} {...props} />
  );

  return { rendered, open, close };
}
