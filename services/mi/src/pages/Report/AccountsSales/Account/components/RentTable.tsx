import { CardTitle } from '$pages/Report/commonStyled';
import { Table, TRowProps } from 'mi-ui';
import { sortBy, cloneDeep } from 'lodash';
import { TRentalIndicator } from '$modules/report/accountSales';
import { Card as CommonCard } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
const Card = styled(CommonCard)`
  min-height: auto;
`;
const COLUMN = [
  {
    name: 'label',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
        width: '15%',
      },
      textFormat: (value) => value,
    },
  },
];

const ROW_DATA = [
  {
    name: 'yearMonth',
    data: [
      {
        colName: 'label',
        value: '구분',
      },
    ],
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
      textFormat: (value) =>
        value === '평균' ? value : `${value.slice(2, 4)}년 ${value.slice(4)}월`,
    },
  },
  {
    name: 'cancelRate',
    data: [
      {
        colName: 'label',
        value: '계정 해약률(%)',
      },
    ],
    options: {
      textFormat: (value) =>
        typeof value === 'number' ? `${value?.toFixed(2)}%` : value,
    },
  },
];

const columnDataToRowData = (data, avgData) => {
  if (data?.length <= 0 || !avgData) return [];
  const rowKeys = ROW_DATA.map((data) => data.name);
  const sortData = sortBy(data, 'yearMonth').map(({ yearMonth, rentalIndicatorRow }) => {
    return {
      yearMonth,
      rentalIndicatorRow: {
        yearMonth,
        ...rentalIndicatorRow,
      },
    };
  });
  sortData.push({
    yearMonth: '평균',
    rentalIndicatorRow: { yearMonth: '평균', ...avgData },
  });
  return rowKeys.map((key) => {
    const dataByKey = sortData.map(({ yearMonth, rentalIndicatorRow }) => {
      return {
        colName: yearMonth,
        value: rentalIndicatorRow[key],
      };
    });
    const rowData = cloneDeep(ROW_DATA);
    const row = rowData.find((row) => row.name === key) || {};
    row['data'] = [...row['data'], ...dataByKey];

    return row;
  }) as TRowProps[];
};

type TRendTableProps = {
  data?: TRentalIndicator;
};

export const RentTable = ({ data }: TRendTableProps) => {
  const rowData = columnDataToRowData(
    data?.monthlyRentalIndicatorRows,
    data?.rentalIndicatorAverage,
  );

  return (
    <Card>
      <CardTitle>렌탈 지표</CardTitle>
      <Table rows={rowData} columns={COLUMN} showHeader={false}></Table>
    </Card>
  );
};
