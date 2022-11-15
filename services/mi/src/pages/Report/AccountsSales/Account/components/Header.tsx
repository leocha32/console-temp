import React, { useCallback } from 'react';
// import { Header as CHeader } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
import {
  Button as MuiButton,
  DatePicker,
  ISelectProps,
  Select,
  IDatePickerProps,
  FlexDirection,
  RadioButton,
  JustifyContent,
} from 'mi-ui/src';
import dayjs from 'dayjs';

const CHeader = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto auto;
`;
const RadioWrap = styled.div`
  display: flex;
  gap: 15px;
  grid-row: 1/2;
`;
const SelectWrap = styled.div`
  display: flex;
  gap: 15px;
  grid-row: 2/3;
`;

const CUSTOMER_OPTIONS = ['전체 고객', '개인', '개인 사업자', '법인 사업자'];
const PURCHASE_METHOD = ['전체', '렌탈', '일시불'];
const Button = styled(MuiButton)``;

export interface IHeaderProps {
  selects: ISelectProps[];
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
}
export const Header = ({ selects, onChangeDate, selectedDate }: IHeaderProps) => {
  const handleRawDataDownload = useCallback(() => {
    console.log('down');
  }, []);

  return (
    <CHeader>
      <RadioWrap>
        <RadioButton
          flexDirection={FlexDirection.ROW}
          options={CUSTOMER_OPTIONS}
          value={'전체 고객'}
        ></RadioButton>
        <RadioButton
          sx={{ padding: '0 10px' }}
          options={PURCHASE_METHOD}
          value={'전체 고객'}
        ></RadioButton>
      </RadioWrap>
      <SelectWrap>
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
      </SelectWrap>
      <Button
        justifyContent={JustifyContent.RIGHT}
        sx={{ justifyContent: 'end', width: 'fit-content' }}
        onClick={handleRawDataDownload}
        label={'상세 데이터 다운로드'}
      />
    </CHeader>
  );
};

export default Header;
