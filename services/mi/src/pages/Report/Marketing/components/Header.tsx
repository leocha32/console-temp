import React, { useCallback } from 'react';
import { Header as CHeader } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
import { Button, DatePicker, ISelectProps, Select, IDatePickerProps } from 'mi-ui';
import dayjs from 'dayjs';

const FilterWrap = styled.div`
  display: flex;
  gap: 15px;
`;

export interface IHeaderProps {
  selects: ISelectProps[];
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
}
const Header = ({ selects, onChangeDate, selectedDate }: IHeaderProps) => {
  const handleRawDataDownload = useCallback(() => {
    console.log('down');
  }, []);

  return (
    <CHeader>
      <FilterWrap>
        {selects?.map(
          ({ title, onChange, value, options, multiple = false, ...props }, index) => (
            <Select
              key={index}
              multiple={multiple}
              title={title}
              options={options}
              onChange={onChange}
              value={value}
              {...props}
            />
          ),
        )}
        <DatePicker
          onChange={onChangeDate}
          value={selectedDate}
          maxDate={dayjs()}
          inputFormat={'YYYY.MM'}
          views={['year', 'month']}
        />
      </FilterWrap>
      <Button onClick={handleRawDataDownload} label={'상세 데이터 다운로드'} />
    </CHeader>
  );
};

export default Header;
