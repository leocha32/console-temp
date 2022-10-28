import React from 'react';
import {
  IconButtonProps as MuiIconButtonProps,
  IconButton as MuiIconButton,
} from '@mui/material';
export type TIconButtonProps = MuiIconButtonProps;
export const IconButton = ({ ...props }: TIconButtonProps) => {
  return <MuiIconButton {...props} />;
};
