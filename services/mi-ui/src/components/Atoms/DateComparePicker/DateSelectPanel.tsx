import React, { ChangeEvent } from 'react';
import { Divider, MenuList, MenuItem, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Switch as CSwitch } from '../Switch';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

export const Switch = styled(CSwitch)(({ theme }: { theme: Theme }) => ({
  '.MuiSwitch-switchBase.Mui-checked': {
    color: theme?.palettes.yellow.YELLOW_700,
  },
  '.MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
    backgroundColor: theme?.palettes.yellow.YELLOW_700,
  },
}));

export type TSelectOption = {
  label: string;
  id: SelectOptionId;
  value: number;
};

export const enum SelectOptionId {
  WEEK = 'week',
  MONTH = 'month',
  THREE_MONTH = 'threeMonth',
  YEAR = 'year',
  CUSTOM = 'custom',
}

export const SelectOption: { [key: string]: TSelectOption } = {
  week: {
    label: '지난 7일',
    id: SelectOptionId.WEEK,
    value: 7,
  },
  month: {
    label: '지난 30일',
    id: SelectOptionId.MONTH,
    value: 30,
  },
  threeMonth: {
    label: '지난 90일',
    id: SelectOptionId.THREE_MONTH,
    value: 90,
  },
  year: {
    label: '지난 12개월',
    id: SelectOptionId.YEAR,
    value: 365,
  },
  custom: {
    label: '맞춤 설정',
    id: SelectOptionId.CUSTOM,
    value: 7,
  },
};

export const enum CompareOptionId {
  PREV_PERIOD = 'prev',
  SAME_PERIOD_LAST_YEAR = 'same',
  CUSTOM = 'custom',
}

export const CompareOption = {
  prev: { label: '이전 기간', id: CompareOptionId.PREV_PERIOD },
  same: { label: '전년 동기', id: CompareOptionId.SAME_PERIOD_LAST_YEAR },
  custom: { id: CompareOptionId.CUSTOM, label: '맞춤 설정' },
};

const Wrap = styled.div`
  border-left: 1px solid #e4e4e4;
  flex: 1;
`;
export interface IDateSelectPanelProps {
  selectedType: SelectOptionId;
  compareType: CompareOptionId;
  isCompare?: boolean;
  onChangeSelectedType: (id: SelectOptionId) => void;
  onChangeCompareType: (id: CompareOptionId) => void;
  onChangeCompare: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
export const options = Object.values(SelectOption);
const compareOptions = Object.values(CompareOption);

export const DateSelectPanel = ({
  selectedType,
  compareType,
  isCompare,
  onChangeSelectedType,
  onChangeCompareType,
  onChangeCompare,
}: IDateSelectPanelProps) => {
  return (
    <Wrap>
      <MenuList>
        {options.map(({ label, id }) => (
          <MenuItem key={id} onClick={() => onChangeSelectedType(id)}>
            <ListItemText>{label}</ListItemText>
            {selectedType === id && (
              <Typography variant="body2" color="text.secondary">
                <CheckIcon color="primary" />
              </Typography>
            )}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem>
          <ListItemText>비교</ListItemText>
          <Typography variant="body2" color="text.secondary">
            <Switch
              checked={isCompare}
              onChange={onChangeCompare}
              sx={{ color: 'red' }}
            />
          </Typography>
        </MenuItem>
        {isCompare &&
          compareOptions.map(({ label, id }) => (
            <MenuItem key={id} onClick={() => onChangeCompareType(id)}>
              <ListItemText>{label}</ListItemText>
              {compareType === id && (
                <Typography variant="body2" color="text.secondary">
                  <CheckIcon color="primary" />
                </Typography>
              )}
            </MenuItem>
          ))}
      </MenuList>
    </Wrap>
  );
};
