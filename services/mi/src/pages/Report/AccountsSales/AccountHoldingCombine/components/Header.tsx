import React from 'react';
import styled from '@emotion/styled';
import { Header as CHeader } from '$pages/Report/commonStyled';
import {
  DatePicker,
  IDatePickerProps,
  FlexDirection,
  RadioButton,
  IRadioGroupProps,
  Button,
} from 'mi-ui';
import dayjs from 'dayjs';
import { DownloadButton, IDownloadButtonProp } from '$components/Button/DownloadButton';

const FilterWrap = styled.div`
  display: flex;
  gap: 15px;
  align-items: end;
`;
const RadioWrap = styled.div`
  display: flex;
  gap: 30px;
`;
export interface IHeaderProps<T> {
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
  radioButtonList: IRadioGroupProps[];
  onClickSearch: () => void;
  downloadButtonProps: IDownloadButtonProp<T>;
  isFetching: boolean;
}

export const Header = <T extends object>({
  onChangeDate,
  selectedDate,
  radioButtonList,
  downloadButtonProps,
  onClickSearch,
  isFetching,
}: IHeaderProps<T>) => {
  return (
    <CHeader style={{ alignItems: 'end' }}>
      <FilterWrap>
        <RadioWrap>
          {radioButtonList.map(({ label, options, value, onChange }, i) => (
            <RadioButton
              label={label}
              key={i}
              flexDirection={FlexDirection.ROW}
              options={options}
              value={value}
              onChange={onChange}
            ></RadioButton>
          ))}
        </RadioWrap>
        <DatePicker
          onChange={onChangeDate}
          value={selectedDate}
          maxDate={dayjs()}
          inputFormat={'YYYY.MM'}
          views={['year', 'month']}
        />
        <Button
          sx={{ height: 'fit-content', marginBottom: '2px' }}
          showLoading={isFetching}
          label={'조회'}
          onClick={onClickSearch}
          variant="contained"
        />
      </FilterWrap>
      <DownloadButton label={'상세 데이터 다운로드'} {...downloadButtonProps} />
    </CHeader>
  );
};
