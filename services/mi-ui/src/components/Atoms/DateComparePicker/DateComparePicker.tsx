import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  CompareOption,
  CompareOptionId,
  DateSelectPanel,
  IDateSelectPanelProps,
  options,
  SelectOption,
  SelectOptionId,
} from './DateSelectPanel';
import { Box, Paper } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import styled from '@emotion/styled';
import { DateComparePickerHeader } from './DateComparePickerHeader';
import { IData, IScrollDatePickerProps, ScrollDatePricker } from './ScrollDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Button as CButton } from '../Button';
import { DateCompareButton, TDateCompareButtonHandler } from './DateCompareButton';
import { TDate } from './type';

const Wrap = styled(Paper)(`
    z-index:99;
    display:flex;
    width: 480px; 
    flex-direction: column;
    position: absolute;
    top: 42px;
    right: 0;
    left: 0;
    zIndex: 1
    border-radius: 8px;
    box-shadow: -1px 1px 10px rgb(0 0 0 / 19%), 0 3px 3px rgb(0 0 0 / 13%);
`);

const Contents = styled.div`
  display: flex;
`;

const DatePickerWrap = styled.div`
  flex: 2;
`;

const Footer = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  padding: 6px 10px;
  border-top: 1px solid #e4e4e4;
`;

const Button = styled(CButton)(`
  height:36px;
`);

export interface IDateComparePickerProps
  extends Partial<IScrollDatePickerProps>,
    Partial<IDateSelectPanelProps> {
  onApply: (data: IData) => void;
  onCancel?: () => void;
  open?: boolean;
}

const setCurrentDate = (ref, selectedOption, selectedDate, isCompare, compareDate) => {
  const { current } = ref;
  current.set({
    selectedOption,
    selectedDate,
    isCompare,
    compareDate,
  });
};

const getSelectedOptionType = (diffNum: number): SelectOptionId => {
  const findOption = options.find(({ value }) => value == diffNum);
  return findOption?.id || SelectOptionId.CUSTOM;
};

const getCompareOptionType = (date1: TDate, date2: Dayjs): CompareOptionId => {
  return date1.startDate.diff(date2, 'd') === 1
    ? CompareOptionId.PREV_PERIOD
    : date1.endDate.diff(date2, 'd') === 365
    ? CompareOptionId.SAME_PERIOD_LAST_YEAR
    : CompareOptionId.CUSTOM;
};

export const getCompareDate = (compareType, selectedOptionValue, date: TDate): TDate => {
  return compareType === CompareOptionId.PREV_PERIOD
    ? {
        startDate: date.startDate.subtract(selectedOptionValue, 'd'),
        endDate: date.startDate.subtract(1, 'd'),
      }
    : {
        startDate: date.startDate.subtract(365, 'd'),
        endDate: date.endDate.subtract(365, 'd'),
      };
};

const getDefaultSelectedDate = (selectedOptionValue, defaultDate?: TDate) => {
  return {
    endDate: defaultDate?.endDate || today,
    startDate: defaultDate?.startDate || today.subtract(selectedOptionValue, 'd'),
  };
};

const getDefaultCompareDate = (
  selectedDate,
  compareType,
  selectedOptionValue,
  defaultDate?: TDate,
) => {
  return {
    startDate:
      defaultDate?.startDate ||
      (compareType === CompareOptionId.PREV_PERIOD
        ? selectedDate.startDate.subtract(selectedOptionValue, 'd')
        : selectedDate.startDate.subtract(365, 'd')),
    endDate:
      defaultDate?.endDate ||
      (compareType === CompareOptionId.PREV_PERIOD
        ? selectedDate.startDate.subtract(1, 'd')
        : selectedDate.endDate.subtract(365, 'd')),
  };
};
const today = dayjs();
export const DateComparePicker = ({
  selectedType: propsSelectedType = SelectOptionId.WEEK,
  compareType: propsCompareType = CompareOptionId.PREV_PERIOD,
  isCompare: propsIsCompare = true,
  compareDate: propsCompareDate,
  selectedDate: propsSelectedDate,
  open: propsOpen = false,
  separatorType = 'ko',
  onApply,
  onCancel,
  maxDate = today,
  minDate = today.subtract(5, 'y'),
}: IDateComparePickerProps) => {
  const buttonRef = useRef<TDateCompareButtonHandler>();
  const [open, setOpen] = useState(propsOpen);

  const [focusIndex, setFocusIndex] = useState<number>(0);
  const newSelectedType = useMemo(
    () =>
      !propsSelectedDate
        ? propsSelectedType
        : getSelectedOptionType(
            propsSelectedDate.endDate.diff(propsSelectedDate.startDate, 'd'),
          ),
    [propsSelectedDate, propsSelectedType],
  );

  const [selectedType, setSelectedType] = useState(newSelectedType);
  const _selectedOption = SelectOption[selectedType];
  const [selectedDate, setSelectedDate] = useState<TDate>(
    getDefaultSelectedDate(_selectedOption.value, propsSelectedDate),
  );

  const newCompareType = useMemo(
    () =>
      !propsCompareDate
        ? propsCompareType
        : getCompareOptionType(
            getDefaultSelectedDate(_selectedOption.value, propsSelectedDate),
            propsCompareDate?.endDate,
          ),
    [propsCompareDate, propsSelectedDate, propsCompareType, _selectedOption.value],
  );
  const [compareType, setCompareType] = useState(newCompareType);
  const [isCompare, setIsCompare] = useState(propsIsCompare);

  const _compareOption = CompareOption[compareType];

  const [compareDate, setCompareDate] = useState<TDate>(
    getDefaultCompareDate(
      selectedDate,
      compareType,
      _selectedOption.value,
      propsCompareDate,
    ),
  );

  useEffect(() => {
    setCurrentDate(buttonRef, _selectedOption, selectedDate, isCompare, compareDate);
  }, []);

  const handleChangeSelectedType = useCallback(
    (id) => {
      const selectedOption = SelectOption[id];
      const type = selectedOption.id;
      const compareType = _compareOption.id;
      if (type === SelectOptionId.CUSTOM) {
        setFocusIndex(0);
      }
      if (type !== SelectOptionId.CUSTOM) {
        const newStartDate = today.subtract(selectedOption.value, 'd');
        const newEndDate = today;
        setSelectedDate({
          endDate: newEndDate,
          startDate: newStartDate,
        });
        if (compareType !== CompareOptionId.CUSTOM) {
          setCompareDate(() => {
            return getCompareDate(compareType, selectedOption.value, {
              startDate: newStartDate,
              endDate: newEndDate,
            });
          });
        }
      }
      setSelectedType(id);
    },
    [_compareOption],
  );

  const handleChangeCompareType = useCallback(
    (id) => {
      const compareOption = CompareOption[id];
      const compareType = compareOption.id;

      if (compareType !== CompareOptionId.CUSTOM) {
        const subtractValue =
          selectedType === SelectOptionId.CUSTOM
            ? selectedDate.endDate.diff(selectedDate.startDate, 'd') + 1
            : _selectedOption.value;

        setCompareDate(() => {
          return getCompareDate(compareType, subtractValue, selectedDate);
        });
      } else {
        setFocusIndex(2);
      }

      setCompareType(id);
    },
    [setFocusIndex, selectedDate, _selectedOption, selectedType],
  );

  const handleCompare = useCallback(
    (_, checked) => {
      setIsCompare(checked);
      if (checked && compareType !== CompareOptionId.CUSTOM) {
        setCompareDate(() => {
          const subtractValue =
            selectedType === SelectOptionId.CUSTOM
              ? selectedDate.endDate.diff(selectedDate.startDate, 'd') + 1
              : _selectedOption.value;

          return getCompareDate(compareType, subtractValue, selectedDate);
        });
      }
    },
    [compareType, selectedDate, selectedType, _selectedOption.value],
  );

  const clear = useCallback(() => {
    const _selectedOption = SelectOption[newSelectedType];
    setSelectedType(newSelectedType);
    setCompareType(newCompareType);
    setIsCompare(propsIsCompare);
    const newSelectedDate = getDefaultSelectedDate(
      _selectedOption.value,
      propsSelectedDate,
    );
    setSelectedDate(newSelectedDate);

    setCompareDate(
      getDefaultCompareDate(
        newSelectedDate,
        newCompareType,
        _selectedOption.value,
        propsCompareDate,
      ),
    );

    setFocusIndex(0);
  }, [
    newSelectedType,
    newCompareType,
    propsCompareDate,
    propsSelectedDate,
    propsIsCompare,
  ]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChangeSelectedDate = useCallback(
    (date: TDate) => {
      if (selectedType !== SelectOptionId.CUSTOM) {
        setSelectedType(SelectOptionId.CUSTOM);
      }
      if (isCompare) {
        if (compareType !== CompareOptionId.CUSTOM) {
          setCompareType(CompareOptionId.CUSTOM);
        }
      }

      setSelectedDate(date);
      setFocusIndex((prev) => (!isCompare && prev === 1 ? 0 : ++prev));
    },
    [selectedType, compareType, isCompare],
  );

  const handleChangeCompareDate = useCallback(
    (date: TDate) => {
      if (selectedType !== SelectOptionId.CUSTOM) {
        setSelectedType(SelectOptionId.CUSTOM);
      }
      if (compareType !== CompareOptionId.CUSTOM) {
        setCompareType(CompareOptionId.CUSTOM);
      }
      setCompareDate(date);
      setFocusIndex((prev) => (prev === 3 ? 0 : ++prev));
    },
    [selectedType, compareType],
  );

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    clear();
    handleClose();
  }, [clear, onCancel, handleClose]);

  const handleApply = useCallback(() => {
    setCurrentDate(buttonRef, _selectedOption, selectedDate, isCompare, compareDate);
    onApply({
      selectedDate,
      compareDate,
      isCompare,
    });
    handleClose();
  }, [
    onApply,
    buttonRef,
    handleClose,
    isCompare,
    _selectedOption,
    selectedDate,
    compareDate,
  ]);

  const scrollDatePickerProps = {
    selectedDate,
    compareDate,
    isCompare,
    separatorType,
    maxDate,
    minDate,
    focusIndex,
    onChangeCompareDate: handleChangeCompareDate,
    onChangeSelectedDate: handleChangeSelectedDate,
  };

  const handleChangeFocusIndex = useCallback((index: number) => {
    setFocusIndex(index);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleCancel}>
      <Box sx={{ position: 'relative' }}>
        <DateCompareButton ref={buttonRef} onClick={() => setOpen(true)} />
        {open ? (
          <Wrap>
            <Contents>
              <DatePickerWrap>
                <DateComparePickerHeader
                  onChangeFocusIndex={handleChangeFocusIndex}
                  compareLabel={_compareOption.label}
                  selectedLabel={_selectedOption.label}
                  {...scrollDatePickerProps}
                />
                <ScrollDatePricker {...scrollDatePickerProps} />
              </DatePickerWrap>
              <DateSelectPanel
                compareType={compareType}
                selectedType={selectedType}
                isCompare={isCompare}
                onChangeSelectedType={handleChangeSelectedType}
                onChangeCompareType={handleChangeCompareType}
                onChangeCompare={handleCompare}
              />
            </Contents>
            <Footer>
              <Button label={'취소'} onClick={handleCancel} />
              <Button label={'적용'} onClick={handleApply} />
            </Footer>
          </Wrap>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};
