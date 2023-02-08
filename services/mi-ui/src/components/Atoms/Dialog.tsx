import React, { PropsWithChildren, useCallback } from 'react';
import Button from '@mui/material/Button';
import {
  Dialog as MuiDialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export interface IDialogProps extends DialogProps, PropsWithChildren {
  title: string;
  okText?: string;
  cancelText?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
  disableBackdropClick?: boolean;
  type?: Type;
  dialogType?: DialogType;
  disabledOkButton?: boolean;
}

export enum Type {
  INFO = 'info',
  ERROR = 'error',
}
export enum DialogType {
  CONFIRM = 'confirm',
  ALERT = 'alert',
  FORM = 'form',
}
export const Dialog = ({
  open,
  title,
  children,
  onClose,
  onOk,
  disableEscapeKeyDown,
  disableBackdropClick,
  type = Type.INFO,
  dialogType = DialogType.ALERT,
  cancelText = '취소',
  okText = '확인',
  maxWidth = dialogType !== DialogType.FORM ? 'xs' : 'sm',
  disabledOkButton = false,
  ...props
}: IDialogProps) => {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return false;
    }

    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return false;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleOk = useCallback(() => {
    if (onOk) {
      onOk();
    }
  }, [onOk]);

  const handleCancel = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <MuiDialog {...props} maxWidth={maxWidth} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          borderBottom: 'solid 1px rgba(102, 112, 134, 0.4)',
          gap: '10px',

          minWidth:
            maxWidth === 'xs'
              ? '300px'
              : maxWidth === 'sm'
              ? '500px'
              : maxWidth === 'md'
              ? '700px'
              : maxWidth === 'lg'
              ? '900px'
              : maxWidth === 'xl'
              ? '1100px'
              : '500px',
        }}
      >
        {dialogType === DialogType.ALERT && (
          <InfoIcon sx={{ color: type === Type.INFO ? 'green' : 'red' }} />
        )}
        <Box>{title}</Box>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '15px 24px !important',
          minHeight:
            dialogType !== DialogType.FORM
              ? 'auto'
              : maxWidth === 'xs'
              ? '300px'
              : maxWidth === 'sm'
              ? '500px'
              : maxWidth === 'md'
              ? '700px'
              : maxWidth === 'lg'
              ? '900px'
              : maxWidth === 'xl'
              ? '1100px'
              : '500px',
        }}
      >
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: 'solid 1px rgba(102, 112, 134, 0.4)',
        }}
      >
        {dialogType !== DialogType.ALERT && (
          <Button onClick={handleCancel}>{cancelText}</Button>
        )}
        <Button onClick={handleOk} disabled={disabledOkButton}>
          {okText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
