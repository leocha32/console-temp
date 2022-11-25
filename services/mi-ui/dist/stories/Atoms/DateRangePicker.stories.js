import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { DateRangePicker as CDateRangePicker, } from 'components/Atoms';
import dayjs from 'dayjs';
export default {
    title: 'Atoms/DateRangePicker',
    component: CDateRangePicker,
};
export const DateRangePicker = (args) => {
    return _jsx(CDateRangePicker, Object.assign({}, args));
};
DateRangePicker.args = {
    startDate: dayjs(new Date()).subtract(1, 'month').toDate(),
    endDate: new Date(),
    size: 'small',
    onChange: (startDate, endDate) => console.log(startDate, endDate),
};
