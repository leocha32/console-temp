import { Dayjs } from 'dayjs';

export type TSeparatorType = '-' | 'ko' | '.';

export type TDate = {
  startDate: Dayjs;
  endDate: Dayjs;
};
