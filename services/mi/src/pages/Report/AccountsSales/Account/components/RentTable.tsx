import { CardTitle, Card } from '$pages/Report/commonStyled';
import { Table, TRowProps } from 'mi-ui';
import { sortBy, cloneDeep } from 'lodash';

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
      height: '10px',
      textFormat: (value) =>
        value === '평균' ? value : `${value.slice(2, 4)}년 ${value.slice(4)}월`,
    },
  },
  {
    name: 'pltMonth',
    data: [
      {
        colName: 'label',
        value: 'PLT 개월수(월)',
      },
    ],
    options: {
      height: '10px',
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
      height: '10px',
      textFormat: (value) => value.toLocaleString('ko-KR') + '%',
    },
  },
  {
    name: 'arpu',
    data: [
      {
        colName: 'label',
        value: 'ARPU(원)',
      },
    ],
    options: {
      height: '10px',
      textFormat: (value) => '₩' + value.toLocaleString('ko-KR'),
    },
  },
];

const TestData = [
  {
    yearMonth: '202204',
    rentalIndicatorRow: {
      pltMonth: 38.5,
      cancelRate: 8.09,
      arpu: 34452,
    },
  },
  {
    yearMonth: '202202',
    rentalIndicatorRow: {
      pltMonth: 38.6,
      cancelRate: 7.92,
      arpu: 34444,
    },
  },
  {
    yearMonth: '202203',
    rentalIndicatorRow: {
      pltMonth: 38.5,
      cancelRate: 8.01,
      arpu: 34417,
    },
  },
];
const AverageData = {
  pltMonth: 12.9,
  cancelRate: 8.01,
  arpu: 34437,
};

const columnDataToRowData = (data, avgData) => {
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

export const RentTable = () => {
  const rowData = columnDataToRowData(TestData, AverageData);

  return (
    <Card sx={{ display: 'grid', gridTemplateRows: '10% auto' }}>
      <CardTitle>렌탈 지표</CardTitle>
      <Table rows={rowData} columns={COLUMN} showHeader={false}></Table>
    </Card>
  );
};
