import React, { useCallback } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from './DatePicker';

export interface IDateRangePrickerProps
  extends Omit<DatePickerProps<Dayjs, Dayjs>, 'renderInput' | 'value'> {
  startDate?: Dayjs;
  startDateInputForm?: string;
  endDate?: Dayjs;
  endDateInputForm?: string;
}

export const DateRangePicker = ({
  startDate = dayjs(),
  endDate = dayjs(),
  startDateInputForm = 'YYYY-MM-DD',
  endDateInputForm = 'YYYY-MM-DD',
  onChange,
  ...props
}: IDateRangePrickerProps) => {
  const date = dayjs();
  const handleChange = useCallback(
    (name, value) => {
      onChange(name, value.valueOf());
    },
    [onChange],
  );
  const [fromValue, setFromValue] = React.useState<Dayjs | null>(startDate || date);
  const [toValue, setToValue] = React.useState<Dayjs | null>(
    endDate || date.add(1, 'day'),
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        inputFormat={startDateInputForm}
        value={fromValue}
        onChange={(newValue) => {
          setFromValue(newValue);
          handleChange('fromDate', newValue);
        }}
        maxDate={toValue || undefined}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        {...props}
        disableFuture={true}
        inputFormat={endDateInputForm}
        value={toValue}
        onChange={(newValue) => {
          setToValue(newValue);
          handleChange('toDate', newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
