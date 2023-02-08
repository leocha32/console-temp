import { ComponentType } from 'react';
import 'dayjs/plugin/isBetween';
import { Dayjs } from 'dayjs';
import {
  PickersDayProps,
  PickersDay as MuiPickersDay,
} from '@mui/x-date-pickers/PickersDay';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import { TDate } from '../type';
import { colorToRgb } from '../../../../utils/utils';

export interface IRenderDayProps {
  selectedDate: TDate;
  compareDate?: TDate;
}

export interface IPickersDayProps extends PickersDayProps<Dayjs> {
  theme?: Theme;
  between?: 0 | 1;
  compared?: 0 | 1;
  first?: 0 | 1;
  last?: 0 | 1;
}

export const PickersDay = styled(MuiPickersDay)(
  ({ theme, between, compared, first, last }: IPickersDayProps) => ({
    ...(between && {
      borderRadius: 0,
      backgroundColor: `rgba(${colorToRgb(theme?.palettes.blue.BLUE_700 || '').join(
        ',',
      )},0.3)`,
      '&:hover': {
        backgroundColor: `rgba(${colorToRgb(theme?.palettes.blue.BLUE_700 || '').join(
          ',',
        )},0.5)`,
      },
      '&:focus': {
        backgroundColor: `rgba(${colorToRgb(theme?.palettes.blue.BLUE_700 || '').join(
          ',',
        )},0.3)`,
      },
    }),
    ...(compared && {
      borderRadius: 0,
      backgroundColor: `rgba(${colorToRgb(theme?.palettes.yellow.YELLOW_700 || '').join(
        ',',
      )},0.3)`,
      '&:hover': {
        backgroundColor: `rgba(${colorToRgb(theme?.palettes.yellow.YELLOW_700 || '').join(
          ',',
        )},0.5)`,
      },
      '&:focus': {
        backgroundColor: `rgba(${colorToRgb(theme?.palettes.yellow.YELLOW_700 || '').join(
          ',',
        )},0.3)`,
      },
    }),
    ...(compared &&
      between && {
        backgroundColor: `rgba(${colorToRgb(theme?.palettes.green.GREEN_700 || '').join(
          ',',
        )},0.3)`,
        '&:hover': {
          backgroundColor: `rgba(${colorToRgb(theme?.palettes.green.GREEN_700 || '').join(
            ',',
          )},0.5)`,
        },
        '&:focus': {
          backgroundColor: `rgba(${colorToRgb(theme?.palettes.green.GREEN_700 || '').join(
            ',',
          )},0.3)`,
        },
      }),
    ...(first &&
      (!compared || !between) && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
      }),
    ...(last &&
      (!compared || !between) && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
      }),
  }),
) as ComponentType<IPickersDayProps>;

const booleanToNumber = (flag: boolean | undefined) => (flag ? 1 : 0);
export const RenderDay = (
  day: Dayjs,
  selectedDays: Array<Dayjs | null>,
  pickersDayProps: PickersDayProps<Dayjs>,
  { selectedDate, compareDate }: IRenderDayProps,
) => {
  const iseSelectedDateFirst = day.isSame(selectedDate.startDate, 'day');
  const iseSelectedDateLast = day.isSame(selectedDate.endDate, 'day');
  const iseCompareDateFirst = compareDate && day.isSame(compareDate?.startDate, 'day');
  const iseCompareDateLast = compareDate && day.isSame(compareDate?.endDate, 'day');

  const selectedBetween =
    iseSelectedDateFirst ||
    day.isBetween(selectedDate.startDate, selectedDate.endDate) ||
    iseSelectedDateLast;
  const compareBetween =
    compareDate &&
    (iseCompareDateFirst ||
      day.isBetween(compareDate?.startDate, compareDate?.endDate) ||
      iseCompareDateLast);

  const isFirstDay = iseSelectedDateFirst || iseCompareDateFirst;
  const isLastDay = iseSelectedDateLast || iseCompareDateLast;

  return (
    <PickersDay
      {...pickersDayProps}
      day={day}
      disableMargin
      between={booleanToNumber(selectedBetween)}
      compared={booleanToNumber(compareBetween)}
      today={false}
      first={booleanToNumber(isFirstDay)}
      last={booleanToNumber(isLastDay)}
      selected={false}
    />
  );
};
