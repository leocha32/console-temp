import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Header as CHeader } from '$pages/Report/commonStyled';
import {
  Button as MuiButton,
  DatePicker,
  IDatePickerProps,
  FlexDirection,
  RadioButton,
  IRadioGroupProps,
  JustifyContent,
} from 'mi-ui';
import dayjs from 'dayjs';

const FilterWrap = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled(MuiButton)``;

export interface IHeaderProps {
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
  radioButtonList: IRadioGroupProps[];
}
export const Header = ({ onChangeDate, selectedDate, radioButtonList }: IHeaderProps) => {
  const handleRawDataDownload = useCallback(() => {
    console.log('down');
  }, []);

  return (
    <CHeader>
      <FilterWrap>
        {radioButtonList.map(({ options, value, onChange }, i) => (
          <RadioButton
            key={i}
            flexDirection={FlexDirection.ROW}
            options={options}
            value={value}
            onChange={onChange}
          ></RadioButton>
        ))}

        <DatePicker
          onChange={onChangeDate}
          value={selectedDate}
          maxDate={dayjs()}
          inputFormat={'YYYY.MM'}
          views={['year', 'month']}
        />
      </FilterWrap>

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
