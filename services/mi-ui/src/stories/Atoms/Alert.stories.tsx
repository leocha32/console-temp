import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IAlertProps, Alert as CAlert, Button } from 'components/Atoms';

export default {
  title: 'Atoms/Alert',
  component: CAlert,
} as ComponentMeta<typeof CAlert>;

export const Alert: ComponentStory<typeof CAlert> = (args: IAlertProps) => {
  const [openState, setOpenState] = useState(false);

  const handleOpen = () => {
    setOpenState(true);
  };
  const handleClose = () => {
    setOpenState(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen} label={'클릭'} />
      <CAlert {...args} open={openState} onClose={handleClose}></CAlert>
    </div>
  );
};

Alert.args = {
  title: 'Error',
  text: 'An Error is a subclass of Throwable that indicates serious problems that a reasonable ',
  buttonText: '확인',
  disableEscapeKeyDown: false,
  disableBackdropClick: false,
};
