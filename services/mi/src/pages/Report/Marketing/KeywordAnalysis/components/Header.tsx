import {
  Select,
  DateComparePicker,
  ISelectProps,
  IDateComparePickerProps,
} from 'mi-ui/src';
import styled from '@emotion/styled';
import { ISearchButtonProps, SearchButton } from '$components/Button/SearchButton';
import { DownloadButton, IDownloadButtonProp } from '$components/Button';

const FilterWrap = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export interface IHeaderProps<T> extends ISearchButtonProps {
  selectProps: ISelectProps;
  datePickerProps: IDateComparePickerProps;
  downloadButtonProps: IDownloadButtonProp<T>;
}

export const Header = <T extends object>({
  selectProps,
  datePickerProps,
  isLoading,
  onClick,
  downloadButtonProps,
}: IHeaderProps<T>) => {
  return (
    <Wrap>
      <FilterWrap>
        <Select {...selectProps} />
        <DateComparePicker {...datePickerProps} />
        <SearchButton isLoading={isLoading} onClick={onClick} />
      </FilterWrap>
      <DownloadButton label={'상세 데이터 다운로드'} {...downloadButtonProps} />
    </Wrap>
  );
};
