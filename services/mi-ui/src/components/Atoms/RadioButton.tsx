import React, { useCallback } from 'react';
import {
  RadioGroupProps as MuiRadioGroupProps,
  RadioGroup as MuiRadioGroup,
  Radio as MuiRadio,
  FormControlLabel as MuiFormControlLabel,
} from '@mui/material';
import { css } from '@emotion/react';

export interface IRadioGroupProps extends MuiRadioGroupProps {
  options: string[];
  flexDirection?: FlexDirection;
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
    <MuiRadioGroup
      {...props}
      css={css`
        display: flex;
        flex-direction: ${flexDirection};
      `}
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
  );
};
