import React, { useMemo, useState } from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type DateRangePickerCustomPickersDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

export const DateRangePickerCustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<DateRangePickerCustomPickersDayProps>(
  ({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }),
) as React.ComponentType<DateRangePickerCustomPickersDayProps>;

export type TDateRangePickerProps = {
  startDate?: Date;
  endDate?: Date;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * @default "Selecione um período"
   */
  placeholder?: string;
};

export const DateRangePicker: React.FC<TDateRangePickerProps> = ({
  onChange,
  startDate,
  endDate,
  size = 'medium',
  placeholder = '선택하세요',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [lastSelectedDate, setLastSelectedDate] = useState<'start' | 'end' | null>(null);
  const [startDateState, setStartDateState] = useState<Date | null>(startDate || null);
  const [endDateState, setEndDateState] = useState<Date | null>(endDate || null);

  const textFieldValue = useMemo(() => {
    if (!startDateState && !endDateState) return placeholder;

    if (startDateState && !endDateState)
      return `${startDateState.toLocaleDateString()} - 선택하세요`;

    if (!startDateState && endDateState)
      return `선택하세요 - ${endDateState.toLocaleDateString()}`;

    return `${startDateState?.toLocaleDateString()} - ${endDateState?.toLocaleDateString()}`;
  }, [endDateState, placeholder, startDateState]);

  const renderSelectedDays = (
    date: Date,
    _selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!startDateState) {
      return <PickersDay {...pickersDayProps} />;
    }

    const currentStart = startDateState || new Date();
    const currentEnd = endDateState || new Date();

    // const startIsBeforeEnd = isBefore(currentStart, currentEnd);

    // const dayIsBetween = startIsBeforeEnd
    //   ? (isAfter(date, currentStart) || isSameDay(date, currentStart)) &&
    //     (isBefore(date, currentEnd) || isSameDay(date, currentEnd))
    //   : (isBefore(date, currentStart) || isSameDay(date, currentStart)) &&
    //     (isAfter(date, currentEnd) || isSameDay(date, currentEnd));
    // const isFirstDay = isSameDay(date, currentStart);
    // const isLastDay = isSameDay(date, currentEnd);

    return (
      <DateRangePickerCustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={false}
        isFirstDay={true}
        isLastDay={true}
      />
    );
  };

  const clearSelection = () => {
    setStartDateState(null);
    setEndDateState(null);
    setLastSelectedDate(null);
  };

  const onClickToday = () => {
    setStartDateState(new Date());
    setEndDateState(new Date());
  };

  const onClickYesterday = () => {
    // setStartDateState(startOfYesterday());
    // setEndDateState(startOfYesterday());
  };

  const onClickThisWeek = () => {
    // setStartDateState(startOfWeek(new Date()));
    // setEndDateState(endOfWeek(new Date()));
  };

  const onClickThisMonth = () => {
    // setStartDateState(startOfMonth(new Date()));
    // setEndDateState(endOfMonth(new Date()));
  };

  const onClose = () => {
    if (!endDateState) setEndDateState(startDateState);

    if (onChange) onChange(startDateState, endDateState);

    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField size={size} value={textFieldValue} onClick={() => setOpen(true)} />

      <Dialog disableEscapeKeyDown open={open}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={startDateState}
          onChange={(newDate) => {
            const newDateValue = newDate ? newDate : null;

            if (!lastSelectedDate || lastSelectedDate === 'end') {
              setStartDateState(newDateValue);
              setLastSelectedDate('start');
            } else {
              setEndDateState(newDateValue);
              setLastSelectedDate('end');
            }
          }}
          renderDay={renderSelectedDays}
          renderInput={(params) => <TextField {...params} />}
        />

        <div className="mb-8 flex flex-row">
          <Button onClick={onClickToday}>Hoje</Button>
          <Button onClick={onClickYesterday}>Ontem</Button>
          <Button onClick={onClickThisWeek}>Essa semana</Button>
          <Button onClick={onClickThisMonth}>Esse mês</Button>
        </div>

        <DialogActions>
          <div className="flex w-full flex-row justify-between">
            <Button variant="text" color="secondary" onClick={clearSelection}>
              Limpar
            </Button>

            <Button variant="contained" onClick={onClose}>
              Confirmar
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};
