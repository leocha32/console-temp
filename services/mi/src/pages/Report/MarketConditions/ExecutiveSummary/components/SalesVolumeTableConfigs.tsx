const PRODUCT_ORDER = ['청정기', '제습기', '가습기', '전기레인지'];

const ROW_OPTIONS = [
  {
    name: 'productGroup',
    label: ' ',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
      },
    },
  },
  {
    name: 'salesValue',
    label: '연간 판매량 (단위: 천대)',
    options: {
      textFormat: (value) => value.toLocaleString('ko-KR'),
    },
  },
  {
    name: 'msBySalesVolume',
    label: '당사 브랜드점유율(판매량 기준)',
    options: {
      textFormat: (value) => {
        const [a, b] = value.split(',');
        return a > 0 ? `${a}% (${b}위)` : '-';
      },
    },
  },
  {
    name: 'salesVolume',
    label: '연간 매출액(단위: 억원)',
    options: {
      textFormat: (value) => value.toLocaleString('ko-KR'),
    },
  },
  {
    name: 'msBySalesValue',
    label: '당사 브랜드 점유율(매출액 기준)',
    options: {
      textFormat: (value) => {
        const [a, b] = value;
        return a > 0 ? `${a}% (${b}위)` : '-';
      },
    },
  },
];
const COLUMN = [
  {
    name: 'rowHeader',
    label: '순위',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
        width: '20%',
      },
    },
  },
  {
    name: '청정기',
    options: {
      sx: {
        width: '20%',
      },
    },
  },
  {
    name: '제습기',
    options: {
      sx: {
        width: '20%',
      },
    },
  },
  {
    name: '가습기',
    options: {
      sx: {
        width: '20%',
      },
    },
  },
  {
    name: '전기레인지',
    options: {
      sx: {
        width: '20%',
      },
    },
  },
];
export { ROW_OPTIONS, PRODUCT_ORDER, COLUMN };
