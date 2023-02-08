import React, { useCallback } from 'react';

import { Dayjs } from 'dayjs';
import { IScrollDatePickerProps } from './ScrollDatePicker';
import { DateTextField, IDateTextFieldProps } from './DateTextField';
import styled from '@emotion/styled';
import { TDate } from './type';

export interface IDateInfoProps extends Omit<IDateTextFieldProps, 'onChange' | 'id'> {
  label: string;
  startDate: Dayjs;
  endDate: Dayjs;
  separator?: string;
  onChange: (date: TDate) => void;
  focusIndex?: number;
  id: IDateTextFieldProps['focusType'];
}

const Wrap = styled.div`
  padding: 16px 20px;
  gap: 6px;
  flex-direction: column;
  display: flex;
`;
const DateInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrap = styled.div`
  display: flex;
  gap: 7px;
`;

const Label = styled.div`
  color: #3c4043;
  font-size: 12px;
  margin-bottom: 2px;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
`;

const DateInfo = ({
  label,
  startDate,
  endDate,
  separator = '-',
  separatorType,
  onChange,
  focusIndex,
  id,
  onFocus,
  maxDate,
  minDate,
}: IDateInfoProps) => {
  const handleChangeStartDate = useCallback(
    (date: Dayjs) => {
      onChange({
        startDate: date,
        endDate,
      });
    },
    [endDate, onChange],
  );
  const handleChangeEndDate = useCallback(
    (date: Dayjs) => {
      onChange({
        startDate,
        endDate: date,
      });
    },
    [onChange, startDate],
  );
  const startIndex = id === 'selected' ? 0 : 2;
  const endIndex = id === 'selected' ? 1 : 3;
  return (
    <DateInfoWrap>
      <Label>{label}</Label>
      <DateWrap>
        <DateTextField
          onFocus={onFocus}
          id={id === 'selected' ? 0 : 2}
          focusType={startIndex === focusIndex ? id : undefined}
          separatorType={separatorType}
          onChange={handleChangeStartDate}
          value={startDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Separator>{separator}</Separator>
        <DateTextField
          onFocus={onFocus}
          id={id === 'selected' ? 1 : 3}
          focusType={endIndex === focusIndex ? id : undefined}
          separatorType={separatorType}
          onChange={handleChangeEndDate}
          value={endDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DateWrap>
    </DateInfoWrap>
  );
};
export interface IDateComparePickerHeader extends IScrollDatePickerProps {
  compareLabel: string;
  selectedLabel: string;
  onChangeFocusIndex: (index: number) => void;
}
export const DateComparePickerHeader = ({
  selectedDate,
  compareDate,
  compareLabel,
  selectedLabel,
  isCompare,
  separatorType,
  onChangeSelectedDate,
  onChangeCompareDate,
  onChangeFocusIndex,
  focusIndex,
  maxDate,
  minDate,
}: IDateComparePickerHeader) => {
  const handleFocus = useCallback(
    (index: number) => {
      onChangeFocusIndex(index);
    },
    [onChangeFocusIndex],
  );

  return (
    <Wrap>
      <DateInfo
        id={'selected'}
        onFocus={handleFocus}
        focusIndex={focusIndex}
        separatorType={separatorType}
        label={selectedLabel}
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={onChangeSelectedDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      {isCompare && (
        <DateInfo
          id={'compared'}
          onFocus={handleFocus}
          focusIndex={focusIndex}
          separatorType={separatorType}
          label={compareLabel}
          startDate={compareDate.startDate}
          endDate={compareDate.endDate}
          onChange={onChangeCompareDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </Wrap>
  );
};
