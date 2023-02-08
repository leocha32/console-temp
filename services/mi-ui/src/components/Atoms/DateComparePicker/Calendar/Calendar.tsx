import { ElementType } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  StaticDatePicker as MuiStaticDatePicker,
  StaticDatePickerProps,
} from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import styled from '@emotion/styled';

import { CalendarHeader, HEADER_HEIGHT } from './CalendarHeader';
import { TSeparatorType } from '../type';
import { IRenderDayProps, RenderDay } from './RenderDay';

export const DAY_PICKER_HEIGHT = 194;
export const DAY_WIDTH = 40;
export const DAY_HEIGHT = 30;
export const CALENDAR_HEIGHT = DAY_PICKER_HEIGHT + HEADER_HEIGHT;

export interface ICalendarProps
  extends Omit<StaticDatePickerProps<Dayjs, Dayjs>, 'renderInput' | 'value'>,
    IRenderDayProps {
  value: Dayjs;
  separatorType: TSeparatorType;
  isCompare?: boolean;
}

const StaticDatePicker = styled(MuiStaticDatePicker)({
  '.MuiPickersCalendarHeader-root, .MuiDayPicker-header': {
    display: 'none',
  },
  '.MuiPickersDay-root': {
    width: `${DAY_WIDTH}px`,
    height: `${DAY_HEIGHT}px`,
    fontSize: '13px',
  },
  '.PrivatePickersSlideTransition-root': {
    minHeight: `${DAY_PICKER_HEIGHT}px`,
  },
}) as ElementType;

export const Calendar = ({
  value,
  separatorType,
  selectedDate,
  compareDate,
  isCompare,
  ...props
}: ICalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarHeader date={value} separatorType={separatorType} />
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        renderDay={(day, selectedDays, pickersDayProps) =>
          RenderDay(day, selectedDays, pickersDayProps, {
            selectedDate,
            compareDate: isCompare ? compareDate : undefined,
          })
        }
        value={value}
        renderInput={(params) => <TextField {...params} />}
        {...props}
      />
    </LocalizationProvider>
  );
};
