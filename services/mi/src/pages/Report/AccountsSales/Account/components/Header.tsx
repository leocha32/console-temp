import React from 'react';
import styled from '@emotion/styled';
import {
  DatePicker,
  ISelectProps,
  Select,
  IDatePickerProps,
  FlexDirection,
  RadioButton,
  IRadioGroupProps,
} from 'mi-ui/src';
import dayjs from 'dayjs';
import { DownloadButton, IDownloadButtonProp, SearchButton } from '$components/Button';

const CHeader = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 15%;
  grid-gap: 15px;
`;
const RadioWrap = styled.div`
  display: flex;
  gap: 30px;
`;
const SelectWrap = styled.div`
  grid-row: 2/3;
  display: flex;
  gap: 15px;
  place-items: center;
`;

export interface IHeaderProps<T> {
  selects: ISelectProps[];
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
  radioButtonList: IRadioGroupProps[];
  downloadButtonProps: IDownloadButtonProp<T>;
  onClickSearch: () => void;
  isFetching: boolean;
}
export const Header = <T extends object>({
  selects,
  onChangeDate,
  selectedDate,
  radioButtonList,
  downloadButtonProps,
  onClickSearch,
  isFetching,
}: IHeaderProps<T>) => {
  return (
    <CHeader>
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
        <SearchButton
          isLoading={isFetching}
          onClick={onClickSearch}
          sx={{ height: 'fit-content' }}
        />
      </SelectWrap>
      <DownloadButton
        sx={{
          gridRow: '2/3',
          gridColumn: '-1/-2',
          width: 'fit-content',
          height: 'fit-content',
          justifySelf: 'end',
        }}
        label={'상세 데이터 다운로드'}
        {...downloadButtonProps}
      />
    </CHeader>
  );
};
