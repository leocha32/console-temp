import { TSeparatorType } from '../type';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';

export const HEADER_HEIGHT = 25;
const DatePickerHeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  height: ${HEADER_HEIGHT}px;
`;

export interface ICalendarHeaderProps {
  date: Dayjs;
  separatorType: TSeparatorType;
}
export const CalendarHeader = ({ date, separatorType }: ICalendarHeaderProps) => {
  const year = date.year();
  const month = date.month();

  const str =
    separatorType === 'ko'
      ? `${year}년 ${month + 1}월`
      : separatorType === '-'
      ? `${year}-${month + 1}`
      : `${year}.${month + 1}`;
  return <DatePickerHeaderWrap>{str}</DatePickerHeaderWrap>;
};
