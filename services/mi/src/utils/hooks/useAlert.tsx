import React, { useCallback, useState, ReactNode } from 'react';
import { Dialog, IDialogProps } from 'mi-ui';

export interface IUseAlertProps extends Omit<IDialogProps, 'text' | 'open'> {
  onOk?: () => void;
  open?: boolean;
}

export default function useAlert({
  open: defaultOpen = false,
  onOk,
  onClose,
  title,
  children: propsChildren,
  ...props
}: IUseAlertProps) {
  const [isOpened, setBeOpened] = useState<boolean>(defaultOpen);
  const [children, setChildren] = useState<ReactNode>(propsChildren);

  const open = useCallback(
    (children?: ReactNode) => {
      if (children) {
        setChildren(children);
      }
      setBeOpened(true);
    },
    [setBeOpened],
  );

  const close = useCallback(() => {
    if (onClose) onClose();
    setBeOpened(false);
  }, [onClose, setBeOpened]);

  const handleOk = useCallback(() => {
    if (onOk) onOk();
    setBeOpened(false);
  }, [onOk]);

  const rendered = (
    <Dialog title={title} open={isOpened} onClose={close} onOk={handleOk} {...props}>
      {children}
    </Dialog>
  );

  return { rendered, open, close };
}
