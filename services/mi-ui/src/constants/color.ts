export const MonoColor = {
  MONO_BLACK: '#000000',
  MONO_800: '#222222',
  MONO_700: '#4C4C4C',
  MONO_500: '#737373',
  MONO_400: '#999999',
  MONO_300: '#B3B3B3',
  MONO_200: '#CCCCCC',
  MONO_100: '#F2F2F2',
  MONO_WHITE: '#FFFFFF',
} as const;

export const BrandColor = {
  COWAY_BLUE: '#00a8e3',
  NETMARBLE_YELLOW: '#ffd800',
} as const;

export const PrimaryColor = {
  PRIMARY_900: '#1c4670',
  PRIMARY_800: '#29628f',
  PRIMARY_700: '#29628f',
  PRIMARY_600: '#3d82b2',
  PRIMARY_500: '#478fbd',
  PRIMARY_400: '#5c9ec5',
  PRIMARY_300: '#74aece',
  PRIMARY_200: '#96c5dc',
  PRIMARY_100: '#bddbea',
  PRIMARY_50: '#e4f1f6',
} as const;

export const GrayColor = {
  GRAY_1000: '#191f28',
  GRAY_900: '#616469',
  GRAY_800: '#888D92',
  GRAY_700: '#9BA1A7',
  GRAY_600: '#AFB5BC',
  GRAY_500: '#C2C9D1',
  GRAY_400: '#DADFE3',
  GRAY_300: '#EAECEF',
  GRAY_200: '#F3F4F6',
  GRAY_100: '#F6F7F8',
} as const;

export const SecondaryColor = {
  SECONDARY_900: '#7F471C',
  SECONDARY_800: '#985522',
  SECONDARY_700: '#CA722E',
  SECONDARY_600: '#E48033',
  SECONDARY_500: '#FD8E39',
  SECONDARY_400: '#FEBB88',
  SECONDARY_300: '#FED7BA',
  SECONDARY_200: '#FFE807',
  SECONDARY_100: '#FFF4EB',
} as const;

export const RedColor = {
  RED_900: '#b71c1c',
  RED_800: '#c62828',
  RED_700: '#d32f2f',
  RED_600: '#e53935',
  RED_500: '#f44336',
  RED_400: '#ef5350',
  RED_300: '#e57373',
  RED_200: '#ef9a9a',
  RED_100: '#ffcdd2',
} as const;

export const OrangeColor = {
  ORANGE_900: '#e65100',
  ORANGE_800: '#ef6c00',
  ORANGE_700: '#f57c00',
  ORANGE_600: '#fb8c00',
  ORANGE_500: '#ff9800',
  ORANGE_400: '#ffa726',
  ORANGE_300: '#ffb74d',
  ORANGE_200: '#ffcc80',
  ORANGE_100: '#ffe0b2',
} as const;

export const BlueColor = {
  BLUE_900: '#0000FF',
  BLUE_800: '#00377d',
  BLUE_700: '#3636D8',
  BLUE_600: '#082a54',
  BLUE_500: '#6666B6',
  BLUE_400: '#5F5F99',
  BLUE_300: '#D3D3F9',
  BLUE_200: '#E8E8FD',
  BLUE_100: '#F6F6FF',
} as const;

export const YellowColor = {
  YELLOW_900: '#f57f17',
  YELLOW_800: '#f9a825',
  YELLOW_700: '#fbc02d',
  YELLOW_600: '#fdd835',
  YELLOW_500: '#ffeb3b',
  YELLOW_400: '#ffee58',
  YELLOW_300: '#fff176',
  YELLOW_200: '#fff59d',
  YELLOW_100: '#fff9c4',
} as const;

export const GreenColor = {
  GREEN_900: '#1b5e20',
  GREEN_800: '#2e7d32',
  GREEN_700: '#388e3c',
  GREEN_600: '#43a047',
  GREEN_500: '#4caf50',
  GREEN_400: '#66bb6a',
  GREEN_300: '#81c784',
  GREEN_200: '#a5d6a7',
  GREEN_100: '#c8e6c9',
} as const;

export const ActionColor = {
  ACTION_GREEN: '#00D200',
  ACTION_BLUE: '#0F6FFF',
  ACTION_RED: '#FF0000',
  ACTION_ORANGE: '#FF8A00',
  ACTION_NAVY: '#2300AF',
} as const;

export const ChartColor = {
  CHART_100: '#5082ff',
  CHART_200: '#32d3d0',
  CHART_300: '#0091cb',
  CHART_400: '#044957',
  CHART_500: '#ff5b5b',
  CHART_600: '#25a75f',
  CHART_700: '#eb9954',
  CHART_800: '#dd0060',
  CHART_900: '#9332d3',
  CHART_110: '#9bd460',
  CHART_120: '#FF61E1',
  CHART_130: '#FFCB00',
  CHART_140: '#9F8367',
  CHART_150: '#B398FF',
  CHART_160: '#DC5043',
  CHART_170: '#0D00B0',
  CHART_180: '#7FBCBB',
  CHART_190: '#8995AE',
  CHART_210: '#50E0FF',
  CHART_220: '#614092',
} as const;

export const VariantColor = {
  DEFAULT: PrimaryColor.PRIMARY_700,
  ERROR: RedColor.RED_700,
  SUCCESS: GreenColor.GREEN_700,
  WARNING: OrangeColor.ORANGE_700,
  INFO: BlueColor.BLUE_700,
};
