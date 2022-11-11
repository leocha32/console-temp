import React, { useCallback } from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { css } from '@emotion/react';
export interface IDatePickerProps
  extends Omit<DatePickerProps<Dayjs, Dayjs>, 'renderInput'> {
  renderInput?: DatePickerProps<Dayjs, Dayjs>['renderInput'];
}
/* views = ['year'] || ['year','month'] || ['year','month',day'](default)*/

export const DatePicker = ({
  inputFormat = 'YYYY.MM.DD',
  onChange,
  ...props
}: IDatePickerProps) => {
  const handleChange = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        css={css`
          background: #fff;
          height: 40px;
          min-width: 200px;
        `}
        inputFormat={inputFormat}
        PaperProps={{
          style: {
            marginTop: '4px',
          },
        }}
        PopperProps={{
          placement: 'bottom-start',
        }}
        {...props}
        onChange={handleChange}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
  );
};
