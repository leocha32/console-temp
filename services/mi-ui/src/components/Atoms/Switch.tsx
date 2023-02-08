import React from 'react';
import { Switch as MuiSwitch, SwitchProps } from '@mui/material';

export type TSwitchProps = SwitchProps;
export const Switch = (props: TSwitchProps) => {
  return <MuiSwitch {...props} />;
};
