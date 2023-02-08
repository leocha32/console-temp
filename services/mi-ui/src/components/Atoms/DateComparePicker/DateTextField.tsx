import InputMask from 'react-input-mask';
import { useCallback, useState, useRef, ElementType, useEffect } from 'react';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import dayjs, { Dayjs } from 'dayjs';
import { TSeparatorType } from './type';
import { colorToRgb } from '../../../utils/utils';

export const Input = styled(InputMask)(
  ({ theme, type }: { theme: Theme; type: IDateTextFieldProps['focusType'] }) => ({
    '&:focus-visible': { outline: 'unset' },
    border: 'none',
    maxWidth: '105px',
    margin: '3px',
    padding: '3px',
    background:
      type === 'selected'
        ? `rgba(${colorToRgb(theme?.palettes.blue.BLUE_700 || '').join(',')},0.3)`
        : type === 'compared'
        ? `rgba(${colorToRgb(theme?.palettes.yellow.YELLOW_700 || '').join(',')},0.3)`
        : 'transparent',
  }),
) as ElementType;

export interface IDateTextFieldProps {
  separatorType: TSeparatorType;
  maxDate?: Dayjs;
  minDate?: Dayjs;
  onChange: (date: Dayjs) => void;
  value?: Dayjs;
  focusType?: 'selected' | 'compared';
  id: number;
  onFocus: (index: number) => void;
}

const validation = (value, format, maxDate, minDate) => {
  const date = dayjs(value, format);
  const formatDate = date.format(format);

  return (
    date.isValid() &&
    formatDate === value &&
    (!maxDate || (maxDate && date < maxDate)) &&
    (!minDate || (minDate && date > minDate))
  );
};

const getMask = (separatorType) => {
  return separatorType === 'ko'
    ? '9999년 19월 39일'
    : separatorType === '-'
    ? '9999-19-39'
    : '9999.19.39';
};

const getFormat = (separatorType) => {
  return separatorType === 'ko'
    ? 'YYYY년 MM월 DD일'
    : separatorType === '-'
    ? 'YYYY-MM-DD'
    : 'YYYY.MM.DD';
};

export const DateTextField = ({
  separatorType,
  maxDate,
  minDate,
  onChange,
  value = dayjs(),
  focusType,
  id,
  onFocus,
}: IDateTextFieldProps) => {
  const prevValue = value.format('YYYYMMDD');
  const [date, setDate] = useState<string>(prevValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const mask = getMask(separatorType);
  const format = getFormat(separatorType);

  useEffect(() => {
    setDate(prevValue);
  }, [prevValue]);

  const handleBlur = useCallback(
    (e) => {
      const value = e.target.value;

      if (value === dayjs(prevValue).format(format)) {
        return;
      }
      if (!validation(value, format, maxDate, minDate)) {
        setDate(dayjs(prevValue).format(format));
        return;
      }
      const date = dayjs(value, format);
      onChange(date);
    },
    [onChange, maxDate, minDate, format, prevValue],
  );

  const handleChange = useCallback((e) => {
    setDate(e.target.value);
  }, []);

  const handleFocus = useCallback(
    ({ target }) => {
      onFocus(Number(target.id));
    },
    [onFocus],
  );
  return (
    <Input
      id={id}
      type={focusType}
      inputRef={inputRef}
      mask={mask}
      onFocus={handleFocus}
      formatChars={{
        1: '[0-1]',
        2: '[0-2]',
        3: '[0-3]',
        9: '[0-9]',
      }}
      value={date}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
