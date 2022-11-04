import React from 'react';
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress as MuiProgress,
} from '@mui/material';

export interface TButtonProps extends MuiButtonProps {
  label?: string;
  showLoading?: boolean;
}
export const Button = ({
  showLoading = false,
  label,
  variant = 'outlined',
  ...props
}: TButtonProps) => {
  return (
    <MuiButton variant={variant} {...props}>
      {label}
      {showLoading && <MuiProgress size={15} />}
    </MuiButton>
  );
};
