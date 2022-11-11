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
} from 'mi-ui';
import dayjs from 'dayjs';

const CHeader = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto auto;
  height: fit-content;
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

const STANDARD_OPTIONS = [
  { key: 'total', value: '전체 고객' },
  { key: 'individual', value: '개인' },
  { key: 'individualBusiness', value: '개인 사업자' },
  { key: 'corporateBusiness', value: '법인 사업자' },
];
const Button = styled(MuiButton)``;

const PURCHASE_METHOD = [
  { key: 'total', value: '전체' },
  { key: 'rent', value: '렌탈' },
  { key: 'payAll', value: '일시불' },
];

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
          options={STANDARD_OPTIONS}
          value={'전체 고객'}
        ></RadioButton>
        <RadioButton
          sx={{ padding: '0 10px' }}
          options={PURCHASE_METHOD}
          value={'전체 고객'}
        ></RadioButton>
      </RadioWrap>
      <SelectWrap>
        {selects?.map(({ title, onChange, value, options, multiple = false }, index) => (
          <Select
            key={index}
            multiple={multiple}
            title={title}
            options={options}
            onChange={onChange}
            value={value}
          />
        ))}
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
