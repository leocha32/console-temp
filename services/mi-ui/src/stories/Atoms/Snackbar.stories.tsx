import React, { Fragment } from 'react';
import { ComponentMeta } from '@storybook/react';

import { SnackbarProvider } from 'components/Atoms';
// Components
import { useSnackbar, ISnackbarProps } from '../../utils/hooks/useSnackbar';
import { Button } from 'components/Atoms';

export default {
  title: 'Atoms/SnackBar',
  component: Fragment,
} as ComponentMeta<typeof Fragment>;

const Component = (args: ISnackbarProps) => {
  const snackbar = useSnackbar(args);

  const handleOpenSnackbar = () => {
    snackbar.add({ message: '성공했습니다.' });
  };
  return (
    <Fragment>
      <Button label={'Add Snackbar'} onClick={handleOpenSnackbar}></Button>
    </Fragment>
  );
};
export const SuccessSnackBar = (args: ISnackbarProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Component {...args} />
    </SnackbarProvider>
  );
};

SuccessSnackBar.args = { title: '성공' };
