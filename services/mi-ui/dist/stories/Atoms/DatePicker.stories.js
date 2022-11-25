import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker as CDatePicker } from 'components/Atoms';
export default {
    title: 'Atoms/DatePicker',
    component: CDatePicker,
};
export const DatePicker = (args) => {
    const [date, onChangeDate] = useState(dayjs());
    return _jsx(CDatePicker, Object.assign({}, args, { value: date, onChange: onChangeDate }));
};
DatePicker.args = {};
export const YearMonthDatePicker = (args) => {
    const [date, onChangeDate] = useState(dayjs());
    return _jsx(CDatePicker, Object.assign({}, args, { value: date, onChange: onChangeDate }));
};
YearMonthDatePicker.args = {
    views: ['year', 'month'],
    inputFormat: 'YYYY.MM',
    maxDate: dayjs(),
};
