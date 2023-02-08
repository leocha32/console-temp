import {
  Select,
  DateComparePicker,
  ISelectProps,
  IDateComparePickerProps,
  RadioButton,
  FlexDirection,
  IRadioGroupProps,
} from 'mi-ui/src';
import styled from '@emotion/styled';
import { ISearchButtonProps, SearchButton } from '$components/Button/SearchButton';
import { DownloadButton, IDownloadButtonProp } from '$components/Button';

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const FilterWrap = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-right: 15px;
`;
export interface IHeaderProps<T> extends ISearchButtonProps {
  selects: ISelectProps[];
  datePickerProps: IDateComparePickerProps;
  downloadButtonProps: IDownloadButtonProp<T>;
  radioButtonList: IRadioGroupProps[];
}

export const Header = <T extends object>({
  selects,
  datePickerProps,
  isLoading,
  radioButtonList,
  onClick,
  downloadButtonProps,
}: IHeaderProps<T>) => {
  return (
    <Wrap>
      <FilterWrap>
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
        <DateComparePicker {...datePickerProps} />

        <SearchButton isLoading={isLoading} onClick={onClick} />
      </FilterWrap>
      <DownloadButton label={'상세 데이터 다운로드'} {...downloadButtonProps} />
    </Wrap>
  );
};
