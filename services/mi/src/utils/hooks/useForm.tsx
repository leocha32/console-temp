import React, { useCallback, useState, useEffect } from 'react';
import { Dialog, DialogType, IDialogProps } from 'mi-ui';

export const enum FormType {
  'ADD' = 'ADD',
  'EDIT' = 'EDIT',
}

export interface IFormProps<T> {
  formType: FormType;
  formId: string;
  onChange?: (data: T) => void;
  data: T;
  onChangeOkDisabled?: (value: boolean) => void;
}
export interface IUseFormProps<T> extends Omit<IDialogProps, 'text' | 'open' | 'onOk'> {
  open?: boolean;
  formType: FormType;
  component: any;
  useData: any;
  onOk: (data?: T) => void;
}

export default function useForm<T>({
  open: defaultOpen = false,
  onOk,
  onClose,
  onCancel,
  title,
  component: Component,
  formType,
  useData,
  ...props
}: IUseFormProps<T>) {
  const [formData, setFormData] = useState<T>();
  const [isOpened, setBeOpened] = useState<boolean>(defaultOpen);
  const [formId, setFormId] = useState<string>('');
  const [okDisabled, setOkDisabled] = useState(formType !== FormType.EDIT);

  const { data, isFetching } = useData(formId || '', {
    enabled: formType === FormType.EDIT,
  });
  const handleOk = useCallback(() => {
    if (onOk) onOk(formData);
    setBeOpened(false);
  }, [onOk, formData]);

  const handleKeyDownEnter = useCallback(
    ({ keyCode }) => {
      if (keyCode === 13) {
        //enter
        if (!okDisabled) {
          handleOk();
        }
      }
    },
    [okDisabled, handleOk],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownEnter);
    if (data) {
      setFormData({ ...data });
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDownEnter);
    };
  }, [data]);

  const handleChange = useCallback((data: T) => {
    setFormData({ ...data });
  }, []);

  const open = useCallback(
    (formId?: string) => {
      if (formId) {
        setFormId(formId);
      }
      setBeOpened(true);
    },
    [setBeOpened],
  );

  const close = useCallback(() => {
    if (onClose) onClose();
    setBeOpened(false);
  }, [onClose, setBeOpened]);

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    setBeOpened(false);
  }, [onCancel]);

  const handleChangeOkDisabled = useCallback((value) => {
    setOkDisabled(value);
  }, []);
  const rendered = (
    <Dialog
      title={title}
      open={isOpened}
      onClose={close}
      onOk={handleOk}
      onCancel={handleCancel}
      dialogType={DialogType.FORM}
      disabledOkButton={okDisabled}
      {...props}
    >
      <Component
        formType={formType}
        formId={formId}
        onChange={handleChange}
        data={formData}
        onChangeOkDisabled={handleChangeOkDisabled}
      />
    </Dialog>
  );

  return { rendered, open, close };
}
