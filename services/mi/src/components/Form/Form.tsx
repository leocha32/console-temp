import { Dialog, DialogType, IDialogProps, Spinner } from 'mi-ui/src';
import { FormType } from '$utils/hooks';
import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isString } from 'lodash';

export interface IFormComponentProps<T> {
  formType: FormType;
  onChange?: (data: T) => void;
  data: T;
  onChangeOkDisabled?: (value: boolean) => void;
}

export interface IFormProps<T>
  extends Omit<IDialogProps, 'text' | 'open' | 'onOk' | 'defaultValue'> {
  formType: FormType;
  form: FunctionComponent<IFormComponentProps<T>>;
  useData: any;
  onOk: (data?: T) => void;
  closeRedirectTo: string | ((param: any) => string);
  defaultValue: T;
}

const Form = <T extends object>({
  onOk,
  onClose,
  onCancel,
  title,
  form: Component,
  formType,
  useData,
  closeRedirectTo,
  defaultValue,
  ...props
}: IFormProps<T>) => {
  const [formData, setFormData] = useState<T>(defaultValue);
  const [okDisabled, setOkDisabled] = useState(formType !== FormType.EDIT);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, isFetching } = useData(state || {}, {
    enabled: formType === FormType.EDIT,
  });
  const redirect = useCallback(() => {
    if (isString(closeRedirectTo)) {
      navigate(closeRedirectTo);
    } else {
      navigate(-1);
    }
  }, [closeRedirectTo, navigate]);
  const handleOk = useCallback(() => {
    if (onOk) onOk(formData);
    redirect();
  }, [onOk, formData, redirect]);

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

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    redirect();
  }, [onCancel, redirect]);

  const handleChangeOkDisabled = useCallback((value) => {
    setOkDisabled(value);
  }, []);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    redirect();
  }, [onClose, redirect]);

  return (
    <Dialog
      title={title}
      open={true}
      onClose={handleClose}
      onOk={handleOk}
      onCancel={handleCancel}
      dialogType={DialogType.FORM}
      disabledOkButton={okDisabled}
      disableBackdropClick
      {...props}
    >
      {isFetching ? <Spinner /> : null}
      <Component
        formType={formType}
        onChange={handleChange}
        data={formData as T}
        onChangeOkDisabled={handleChangeOkDisabled}
      />
    </Dialog>
  );
};

export default Form;
