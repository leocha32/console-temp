import React, { useCallback } from 'react';
import {
  RadioGroupProps as MuiRadioGroupProps,
  RadioGroup as MuiRadioGroup,
  Radio as MuiRadio,
  FormControlLabel as MuiFormControlLabel,
  FormLabel as MuiFormLabel,
  FormControl,
} from '@mui/material';

export interface IRadioGroupProps extends MuiRadioGroupProps {
  options: string[];
  flexDirection?: FlexDirection;
  label?: string;
}

export enum FlexDirection {
  COLUMN = 'column',
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN_REVERSE = 'column-reverse',
}

export const RadioButton = ({
  options,
  flexDirection = FlexDirection.ROW,
  onChange,
  label,
  ...props
}: IRadioGroupProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      if (onChange instanceof Function) {
        onChange(event, value);
      }
    },
    [onChange],
  );
  return (
    <FormControl>
      <MuiFormLabel sx={{ color: 'black' }}>{label}</MuiFormLabel>

      <MuiRadioGroup
        {...props}
        row={flexDirection === 'row'}
        // sx={{ border: 'solid 1px lightgray', borderRadius: '4px' }}
        defaultValue={options ? options[0] : ''}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {options.map((value) => (
          <MuiFormControlLabel
            key={value}
            value={value}
            control={<MuiRadio />}
            label={value}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};
