import React from 'react';
import {
  RadioGroupProps as MuiRadioGroupProps,
  RadioGroup as MuiRadioGroup,
  Radio as MuiRadio,
  FormControlLabel as MuiFormControlLabel,
} from '@mui/material';
import { css } from '@emotion/react';

export interface IRadioGroupProps extends MuiRadioGroupProps {
  options: TRadioOptions[];
  flexDirection?: FlexDirection;
}

export type TRadioOptions = {
  key: string;
  value: string;
};

export enum FlexDirection {
  COLUMN = 'column',
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN_REVERSE = 'column-reverse',
}

export const RadioButton = ({
  options,
  flexDirection = FlexDirection.ROW,
  value = '',
  ...props
}: IRadioGroupProps) => {
  return (
    <MuiRadioGroup
      {...props}
      css={css`
        display: flex;
        flex-direction: ${flexDirection};
      `}
      defaultValue={value ? value : ''}
      name="radio-buttons-group"
    >
      {options.map(({ key, value }) => (
        <MuiFormControlLabel
          key={key}
          value={value}
          control={<MuiRadio />}
          label={value}
        />
      ))}
    </MuiRadioGroup>
  );
};
