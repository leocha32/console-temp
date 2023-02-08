import FormComponent, { IFormProps } from '$components/Form/Form';
import { IUser, useUpdateUser, useUser, useAddUser } from '$modules/management/user';
import { useCallback } from 'react';
import { useSnackbar } from 'mi-ui/src';
import { FormType } from '$utils/hooks';
import { addSnackbar, makeParams } from '$utils/userTreeUtils';
import { UserAddForm, defaultValue } from './components/UserAddForm';

export type TTestProps = Pick<IFormProps<IUser>, 'formType' | 'title'>;

const Form = ({ formType, title }: TTestProps) => {
  const snackbar = useSnackbar({});

  const updateUser = useUpdateUser({
    onSuccess: (result) => addSnackbar(snackbar, result),
  });

  const addUser = useAddUser({
    onSuccess: (result) => addSnackbar(snackbar, result),
  });

  const handleEdit = useCallback(
    (data?: IUser) => {
      const { selected, ...user } = data as IUser;
      updateUser.mutate({
        ...user,
        accessibleUri: makeParams(selected).join(','),
      } as IUser);
    },
    [updateUser],
  );

  const handleAdd = useCallback(
    (data?: IUser) => {
      const { selected, ...user } = data as IUser;
      addUser.mutate({
        ...user,
        accessibleUri: makeParams(selected).join(','),
      } as IUser);
    },
    [addUser],
  );

  const handleOk = formType === FormType.EDIT ? handleEdit : handleAdd;

  return (
    <FormComponent
      title={title}
      formType={formType}
      useData={useUser}
      form={UserAddForm}
      onOk={handleOk}
      defaultValue={defaultValue}
      closeRedirectTo={'/management/administrator/user/'}
    />
  );
};

export default Form;
