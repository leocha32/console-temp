import Button from '@mui/material/Button';
import {
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { css } from '@emotion/react';

export interface IAlertProps extends DialogProps {
  title: string;
  text: string;
  buttonText?: string;
  onClose: () => void;
  disableBackdropClick?: boolean;
  type?: Type;
}

export enum Type {
  INFO = 'info',
  ERROR = 'error',
}

export const Alert = ({
  open,
  title,
  text,
  onClose,
  disableEscapeKeyDown,
  disableBackdropClick,
  type = Type.INFO,
  buttonText = '닫기',
  maxWidth = 'xs',
  ...props
}: IAlertProps) => {
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

  return (
    <Dialog {...props} maxWidth={maxWidth} open={open} onClose={handleClose}>
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
        <InfoIcon sx={{ color: type === Type.INFO ? 'green' : 'red' }} />
        <Box>{title}</Box>
      </DialogTitle>
      <DialogContent
        css={css`
          padding: 15px 24px !important;
        `}
      >
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: 'solid 1px rgba(102, 112, 134, 0.4)',
        }}
      >
        <Button onClick={onClose}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
};
