import React from 'react';
import { ButtonProps as MuiButtonProps, Button as MuiButton } from '@mui/material';
export type TButtonProps = MuiButtonProps;
export const Button = (props: TButtonProps) => {
  return <MuiButton {...props} />;
};
