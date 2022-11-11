import React, { useState, useCallback, useMemo } from 'react';
import {
  SelectProps,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  IconButton,
  Checkbox,
  ListItemText,
  TextField,
  ListSubheader,
  InputAdornment,
  OutlinedInput,
  FormControlLabel as MuiFormControlLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface ISelectOption {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface ISelectProps extends Omit<SelectProps, 'onChange'> {
  options: ISelectOption[];
  onChange: (value: string | string[]) => void;
  useSearch?: boolean;
  defaultLabel?: string;
  useAllCheck?: boolean;
  title?: string;
}

const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;
const SubHeader = styled(ListSubheader)`
  padding: 0;
  color: ${({ theme }) => theme.palettes.gray.GRAY_1000};
`;

const SearchInput = styled(TextField)`
  padding: 0 10px;
  width: calc(100% - 20px);
  height: ;
`;

const CSelect = styled(MuiSelect)`
  min-width: 200px;
  height: 40px;
  background: #fff;
`;

const MenuItem = styled(MuiMenuItem)`
  height: ${ITEM_HEIGHT}px;
  min-height: ${ITEM_HEIGHT}px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_1000};
  padding: 6px 10px;
  font-size: 12px;
  &.select : {
    background-color: red;
  }
`;

const FormControlLabel = styled(MuiFormControlLabel)`
  padding: 0 10px;
  color: #191f28;
`;

const SearchWrap = styled.div`
  position: relative;
`;
const clearButtonStyle = css`
  position: absolute;
  right: 14px;
  top: 5px;
`;
export const Select = ({
  multiple = false,
  title = '',
  displayEmpty = true,
  onChange,
  options,
  value: values,
  useSearch = false,
  useAllCheck = multiple,
  defaultLabel = '선택하세요.',
  ...props
}: ISelectProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const displayedOptions = useMemo(
    () =>
      options.filter(
        ({ label }) => label.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1,
      ),
    [searchKeyword, options],
  );

  const handleAllCheck = useCallback(
    ({ target: { checked } }) => {
      const newValue = checked ? options.map(({ value }) => value) : [];
      onChange(newValue);
    },
    [onChange, options],
  );

  const handleChange = useCallback(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange],
  );

  const handleSearchKeywordChange = useCallback(({ target: { value } }) => {
    setSearchKeyword(value);
  }, []);

  const handleDeleteSearchKeyword = useCallback(() => {
    setSearchKeyword('');
  }, []);

  return (
    <CSelect
      multiple={multiple}
      displayEmpty={displayEmpty}
      value={values}
      input={<OutlinedInput />}
      onChange={handleChange}
      renderValue={(selected) => {
        if (multiple) {
          const text =
            (selected as string[])?.length === options?.length
              ? '전체'
              : `${(selected as string[])?.length} 선택됨`;
          if (title) {
            return (selected as string[]).length ? `${title}: ${text}` : `${title}`;
          } else return (selected as string[]).length ? `${text}` : defaultLabel;
        } else {
          const selectedLabel = displayedOptions?.find(
            ({ value }) => value === selected,
          )?.label;
          if (title) {
            return selectedLabel ? `${title}: ${selectedLabel}` : `${title}`;
          } else return selectedLabel ? `${selectedLabel}` : defaultLabel;
        }
      }}
      MenuProps={{
        autoFocus: false,
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
          },
        },
      }}
      {...props}
    >
      <SubHeader>
        {useSearch ? (
          <SearchWrap>
            <SearchInput
              size="small"
              autoFocus
              placeholder="Search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchKeyword}
              onChange={handleSearchKeywordChange}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            />
            {searchKeyword && (
              <IconButton
                onClick={handleDeleteSearchKeyword}
                css={clearButtonStyle}
                size={'small'}
              >
                <ClearIcon sx={{ width: '20px', height: '20px' }} />
              </IconButton>
            )}
          </SearchWrap>
        ) : null}

        {multiple && useAllCheck && !searchKeyword ? (
          <MenuItem value={'all'}>
            <FormControlLabel
              label="전체"
              control={
                <Checkbox
                  checked={Array.isArray(values) && values?.length === options.length}
                  onChange={handleAllCheck}
                />
              }
            />
          </MenuItem>
        ) : null}
      </SubHeader>

      {displayedOptions?.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {multiple ? (
            <Checkbox checked={Array.isArray(values) && values?.includes(value)} />
          ) : null}
          <ListItemText title={label?.toString()}>{label}</ListItemText>
        </MenuItem>
      ))}
    </CSelect>
  );
};
