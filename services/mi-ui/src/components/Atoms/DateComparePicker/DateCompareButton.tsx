import { forwardRef, useImperativeHandle, useState, Ref } from 'react';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TDate } from './type';
import { TSelectOption } from './DateSelectPanel';

const Wrap = styled.div`
  width: 265px;
  padding: 6px 4px;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  font-size: 15px;
  &:hover {
    border-color: #252525;
  }
  border: 1px solid rgb(192, 192, 192);
`;

const LabelWrap = styled.div`
  display: flex;
`;
const Label = styled.div`
  border-right: 1px solid #f1f3f4;
  color: #3c4043;
  padding: 2px 4px;
  font-size: 11px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin-right: 6px;
`;

const SelectedDateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #5f6368;
`;
const CompareDateWrap = styled.div`
  font-size: 13px;
  color: #3c4043;
  display: flex;
  justify-content: end;
  margin-right: 10px;
`;

export interface IDateCompareButtonProps {
  onClick: () => void;
}

export interface IData {
  selectedDate: TDate;
  isCompare: boolean;
  selectedOption: TSelectOption;
  compareDate?: TDate;
}
export type TDateCompareButtonHandler = {
  set: (data: IData) => void;
};

export const DateCompareButton = forwardRef(function DateCompareButton(
  { onClick }: IDateCompareButtonProps,
  ref: Ref<TDateCompareButtonHandler | undefined>,
) {
  const [data, setData] = useState<IData>();

  useImperativeHandle(ref, () => ({
    set: (data) => {
      setData(data);
    },
  }));

  const selectedDate = `${data?.selectedDate.startDate.format(
    'YYYY.MM.DD',
  )} ~ ${data?.selectedDate.endDate.format('YYYY.MM.DD')}`;

  const compareDate = `${data?.compareDate?.startDate.format(
    'YYYY.MM.DD',
  )} ~ ${data?.compareDate?.endDate.format('YYYY.MM.DD')}`;

  return (
    <Wrap onClick={onClick}>
      <SelectedDateWrap>
        <LabelWrap>
          <Label>{data?.selectedOption.label}</Label>
          <div>{selectedDate}</div>
        </LabelWrap>
        <ExpandMoreIcon />
      </SelectedDateWrap>
      {data?.isCompare && <CompareDateWrap>{`compare: ${compareDate}`}</CompareDateWrap>}
    </Wrap>
  );
});
