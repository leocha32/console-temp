import { Dayjs } from 'dayjs';
import { DatePickerProps } from '@mui/x-date-pickers';
export interface IDatePickerProps extends Omit<DatePickerProps<Dayjs, Dayjs>, 'renderInput'> {
    renderInput?: DatePickerProps<Dayjs, Dayjs>['renderInput'];
}
export declare const DatePicker: ({ inputFormat, onChange, ...props }: IDatePickerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map