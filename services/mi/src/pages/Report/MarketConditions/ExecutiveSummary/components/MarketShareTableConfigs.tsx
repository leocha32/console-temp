/**
 * 값 (컬럼)항목 순서
 */
const VALUE_ORDER = [
  'productGroup',
  'marketShareRank',
  'hohDiff',
  'brandShare',
  'productPenetration',
];

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
    name: 'marketShareRank',
    label: '당사 시장 점유율(순위)',
    options: {
      textFormat: (value) => {
        const [a, b] = value.split(',');
        return `${a}% (${b}위)`;
      },
    },
  },
  {
    name: 'hohDiff',
    label: '당사 직전 반기 대비 차이',
    options: {
      textFormat: (value) => `${value > 0 ? '▲' : '▼'} ${Math.abs(value)}%`,
      colorFormat: (value) => {
        return value > 0 ? 'red' : 'blue';
      },
    },
  },
  {
    name: 'brandShare',
    label: '브랜드 점유율 Top3위',
    options: {
      rowSpan: 3,
      textFormat: (value) => {
        const [a, b, c] = value.split(',');
        return `${a}위 ${b} ${c}%`;
      },
    },
  },
  {
    name: 'productPenetration',
    label: '제품 보급률',
    options: {
      textFormat: (value) => `${value}%`,
    },
  },
];
const COLUMN = [
  {
    name: 'rowHeader',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
        width: '20%',
      },
    },
  },
  {
    name: '정수기',
    options: {},
  },
  {
    name: '청정기',
    options: {},
  },
  {
    name: '비데',
    options: {},
  },
  {
    name: '매트리스',
    options: {},
  },
  {
    name: '안마의자',
    options: {},
  },
];
export { ROW_OPTIONS, VALUE_ORDER, COLUMN };
