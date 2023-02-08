import React from 'react';
import { css } from '@emotion/react';
import { DataValue, DataWrap, DiffBox, DiffInfoWrap } from '$pages/Report/commonStyled';
type TDataCardProps = {
  value: string | number;
  unit?: string;
  diffValue: number;
  compValue?: number;
  isCompare: boolean;
  format?: (value: TDataCardProps['value']) => TDataCardProps['value'];
};

const DataCard = ({
  value: propsValue = '0',
  diffValue,
  compValue,
  unit = '회',
  format,
  isCompare,
}: TDataCardProps) => {
  const value = format ? format(propsValue) : propsValue;
  return (
    <DataWrap>
      <DataValue length={String(value).length}>{`${value}${unit}`}</DataValue>
      {isCompare && (
        <DiffInfoWrap>
          <div
            css={css`
              display: flex;
            `}
          >
            {diffValue ? (
              <>
                {`비교 기간 比 ${diffValue}%`}
                <DiffBox value={diffValue}>▼</DiffBox>
              </>
            ) : null}
          </div>
          {compValue && <div>{`(${compValue?.toLocaleString() || 0})`}</div>}
        </DiffInfoWrap>
      )}
    </DataWrap>
  );
};

export default DataCard;
