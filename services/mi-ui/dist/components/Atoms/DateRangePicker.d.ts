import React from 'react';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Theme } from '@emotion/react';
declare type TPickersDayProps = PickersDayProps<Date> & {
    between: number;
    first: number;
    last: number;
    theme?: Theme;
};
export declare const DateRangePickerCustomPickersDay: React.ComponentType<TPickersDayProps>;
export declare type TDateRangePickerProps = {
    startDate: Date;
    endDate: Date;
    onChange?: (startDate: Date | null, endDate: Date | null) => void;
    size?: 'small' | 'medium';
    placeholder?: string;
};
export declare const DateRangePicker: React.FC<TDateRangePickerProps>;
export {};
//# sourceMappingURL=DateRangePicker.d.ts.map