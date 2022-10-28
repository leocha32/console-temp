import React, { useCallback } from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
export type TDatePickerProps = DatePickerProps<Dayjs, Dayjs>;
/* views = ['year'] || ['year','month'] || ['year','month',day'](default)*/
export const DatePicker = ({
  inputFormat = 'YYYY.MM.DD',
  onChange,
  ...props
}: TDatePickerProps) => {
  const handleChange = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        inputFormat={inputFormat}
        {...props}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
