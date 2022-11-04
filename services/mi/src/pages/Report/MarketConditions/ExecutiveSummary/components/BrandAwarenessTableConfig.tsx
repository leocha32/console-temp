const PRODUCT_ORDER = ['정수기', '청정기', '비데', '매트리스', '전기레인지'];

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
    name: '청정기',
    sx: {
      width: '15%',
    },
  },
  {
    name: '제습기',
    sx: {
      width: '15%',
    },
  },
  {
    name: '가습기',
    sx: {
      width: '15%',
    },
  },
  {
    name: '전기레인지',
    sx: {
      width: '15%',
    },
  },
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
    name: 'topOfMind',
    label: '당사 최초상기도 (순위)',
    options: {
      textFormat: (value) => {
        const [a, b] = value.split(',');
        return a > 0 ? `${a}% (${b}위)` : '-';
      },
    },
  },
  {
    name: 'unaidedAwareness',
    label: '당사 비보조인지도',
    options: {
      textFormat: (value) => (value ? value + '%' : '-'),
    },
  },
  {
    name: 'aidedAwareness',
    label: '당사 보조인지도',
    options: {
      textFormat: (value) => (value ? value + '%' : '-'),
    },
  },
  {
    name: 'topOfMindRank',
    label: '최초상기도 Top3위',
    options: {
      rowSpan: 3,
      textFormat: (value = '') => {
        const [a, b, c] = value.split(',');
        return parseInt(c) > 0 ? `${a}위 ${b} ${c}%` : '-';
      },
    },
  },
];

export { ROW_OPTIONS, PRODUCT_ORDER, COLUMN };
