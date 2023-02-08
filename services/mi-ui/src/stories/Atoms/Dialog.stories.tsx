import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IDialogProps, Dialog as CDialog, Button, DialogType } from 'components/Atoms';

export default {
  title: 'Atoms/Dialog',
  component: CDialog,
} as ComponentMeta<typeof CDialog>;

export const Alert: ComponentStory<typeof CDialog> = (args: IDialogProps) => {
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
      <CDialog {...args} open={openState} onOk={handleClose}></CDialog>
    </div>
  );
};

Alert.args = {
  title: 'Error',
  children:
    'An Error is a subclass of Throwable that indicates serious problems that a reasonable ',
  okText: '확인',
  disableEscapeKeyDown: false,
  disableBackdropClick: false,
};

export const Confirm: ComponentStory<typeof CDialog> = (args: IDialogProps) => {
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
      <CDialog {...args} open={openState} onOk={handleClose}></CDialog>
    </div>
  );
};

Confirm.args = {
  dialogType: DialogType.CONFIRM,
  title: '사용자 추가',
  children: '추가하시겠습니까?',
  okText: '확인',
  disableEscapeKeyDown: false,
  disableBackdropClick: false,
};
