import React from 'react';
import { Header as CHeader } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
import { DatePicker, ISelectProps, Select, IDatePickerProps } from 'mi-ui';
import dayjs from 'dayjs';
import { DownloadButton, IDownloadButtonProp } from '$components/Button/DownloadButton';
import { SearchButton } from '$components/Button';

const FilterWrap = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export interface IHeaderProps<T> {
  selects: ISelectProps[];
  onChangeDate: IDatePickerProps['onChange'];
  selectedDate: IDatePickerProps['value'];
  onClickSearch: () => void;
  downloadButtonProps: IDownloadButtonProp<T>;
  isFetching?: boolean;
}
const Header = <T extends object>({
  selects,
  onChangeDate,
  selectedDate,
  downloadButtonProps,
  onClickSearch,
  isFetching = false,
}: IHeaderProps<T>) => {
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
        <SearchButton isLoading={isFetching} onClick={onClickSearch} />
      </FilterWrap>
      <DownloadButton label={'상세 데이터 다운로드'} {...downloadButtonProps} />
    </CHeader>
  );
};

export default Header;
