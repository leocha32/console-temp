import React, { ReactNode, useCallback, useState } from 'react';
import { Dialog, DialogType, IDialogProps } from '../../components/Atoms/Dialog';

export interface IUseConfirmProps extends Omit<IDialogProps, 'text' | 'open'> {
  open?: boolean;
}

export function useConfirm({
  open: defaultOpen = false,
  onOk,
  onClose,
  onCancel,
  title,
  children: propsChildren,
  ...props
}: IUseConfirmProps) {
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

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    setBeOpened(false);
  }, [onCancel]);

  const rendered = (
    <Dialog
      title={title}
      open={isOpened}
      onClose={close}
      onOk={handleOk}
      onCancel={handleCancel}
      dialogType={DialogType.CONFIRM}
      {...props}
    >
      {children}
    </Dialog>
  );

  return { rendered, open, close };
}
