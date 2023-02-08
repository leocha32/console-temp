import React, { ReactNode } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';

export interface ICheckboxProps extends CheckboxProps {
  label?: ReactNode;
}
export const Checkbox = ({ label, ...props }: ICheckboxProps) => {
  return <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />;
};
