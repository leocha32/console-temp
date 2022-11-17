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
  IRadioGroupProps,
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

const Button = styled(MuiButton)``;

export interface IHeaderProps {
  selects: ISelectProps[];
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
  radioButtonList: IRadioGroupProps[];
}
export const Header = ({
  selects,
  onChangeDate,
  selectedDate,
  radioButtonList,
}: IHeaderProps) => {
  const handleRawDataDownload = useCallback(() => {
    console.log('down');
  }, []);

  return (
    <CHeader>
      <RadioWrap>
        {radioButtonList.map(({ options, value, onChange }, i) => (
          <RadioButton
            key={i}
            flexDirection={FlexDirection.ROW}
            options={options}
            value={value}
            onChange={onChange}
          ></RadioButton>
        ))}
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
