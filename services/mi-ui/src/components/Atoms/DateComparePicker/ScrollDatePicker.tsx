import React, { memo, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import { TDate, TSeparatorType } from './type';
import { VirtualScroll } from '../VirtualScroll';
import { Calendar, CALENDAR_HEIGHT, DAY_HEIGHT, DAY_WIDTH } from './Calendar';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);
const SCROLL_WRAP_HEIGHT = 350;

const Wrap = styled.div``;

const WeekItem = styled.div`
  width: ${DAY_WIDTH}px;
  height: ${DAY_HEIGHT}px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const WeekWrap = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.54);
  background: #f5f5f5;
  justify-content: center;
`;

const WeekHeader = () => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <WeekWrap>
      {week.map((w, index) => (
        <WeekItem key={index}>{w}</WeekItem>
      ))}
    </WeekWrap>
  );
};

const getMaxDate = (day1: Dayjs, day2: Dayjs) => dayjs.max(day1, day2);
const getMinDate = (day1: Dayjs, day2: Dayjs) => dayjs.min(day1, day2);

export interface IData {
  isCompare: boolean;
  selectedDate: TDate;
  compareDate: TDate;
}

export interface IScrollDatePickerProps extends IData {
  separatorType: TSeparatorType;
  onChangeSelectedDate: (date: TDate) => void;
  onChangeCompareDate: (date: TDate) => void;
  minDate: Dayjs;
  maxDate: Dayjs;
  focusIndex: number;
}

interface IDatePickerProps
  extends Omit<
    IScrollDatePickerProps,
    'focusIndex' | 'onChangeSelectedDate' | 'onChangeCompareDate'
  > {
  index?: number;
  onChangeDate: (date: Dayjs) => void;
}
// eslint-disable-next-line react/display-name
const DatePicker = memo(
  ({ index = 0, minDate, onChangeDate, ...props }: IDatePickerProps) => {
    const date = minDate.add(index, 'M');
    const [value, setValue] = useState(date.add(1, 'ms'));

    const handleChangeValue = useCallback(
      (newValue) => {
        setValue(newValue);
        onChangeDate(newValue);
      },
      [onChangeDate],
    );

    return (
      <Calendar value={value} onChange={handleChangeValue} minDate={minDate} {...props} />
    );
  },
);

export const ScrollDatePricker = ({
  minDate,
  maxDate,
  onChangeSelectedDate,
  onChangeCompareDate,
  focusIndex,
  ...props
}: IScrollDatePickerProps) => {
  const { selectedDate, compareDate } = props;
  const itemCount = maxDate.diff(minDate, 'M') + 1;
  const startIndex = selectedDate.startDate.diff(minDate, 'M');

  const handleChangeDate = useCallback(
    (date) => {
      if (focusIndex === 0) {
        onChangeSelectedDate({
          startDate: getMinDate(date, selectedDate.endDate),
          endDate: getMaxDate(date, selectedDate.endDate),
        });
      } else if (focusIndex === 1) {
        onChangeSelectedDate({
          startDate: getMinDate(date, selectedDate.startDate),
          endDate: getMaxDate(date, selectedDate.startDate),
        });
      } else if (focusIndex === 2) {
        onChangeCompareDate({
          startDate: getMinDate(date, compareDate.endDate),
          endDate: getMaxDate(date, compareDate.endDate),
        });
      } else if (focusIndex === 3) {
        onChangeCompareDate({
          startDate: getMinDate(date, compareDate.startDate),
          endDate: getMaxDate(date, compareDate.startDate),
        });
      }
    },
    [focusIndex, compareDate, selectedDate, onChangeCompareDate, onChangeSelectedDate],
  );

  return (
    <Wrap>
      <WeekHeader />
      <VirtualScroll
        childrenHeight={CALENDAR_HEIGHT}
        focusIndex={startIndex}
        height={SCROLL_WRAP_HEIGHT}
        itemCount={itemCount}
        childrenComponent={(index) => (
          <DatePicker
            key={index}
            index={index}
            minDate={minDate}
            maxDate={maxDate}
            onChangeDate={handleChangeDate}
            {...props}
          />
        )}
      />
    </Wrap>
  );
};
