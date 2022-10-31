import React from 'react';
import { ButtonProps as MuiButtonProps, Button as MuiButton } from '@mui/material';
export type TButtonProps = MuiButtonProps;
export const Button = ({ variant = 'outlined', ...props }: TButtonProps) => {
  return <MuiButton variant={variant} {...props} />;
};
