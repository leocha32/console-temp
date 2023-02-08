import dayjs from 'dayjs';
import { HalfYear, SearchType } from '$constants/enum';
import { getCompareDate } from 'mi-ui/src';
import { CompareOptionId } from 'mi-ui/src/components/Atoms/DateComparePicker/DateSelectPanel';

const today = dayjs();
const aMonthAgo = dayjs().add(-1, 'M');
const currentYear = dayjs().year();
const currentQuarter = `${currentYear}-${HalfYear.First}`;

export const research = {
  summary: { yyyyh: currentQuarter },
  marketShare: { yyyyh: null },
  salesVolume: { yyyy: null },
  brandAwareness: { yyyyh: null },
};

export const account = {
  accountStatus: {
    customerType: null,
    contractType: null,
    productGroup: null,
    functionalGroup: null,
    product: null,
    yyyymm: aMonthAgo,
  },
  accountCombine: {
    customerType: null,
    contractType: null,
    yyyymm: aMonthAgo,
  },
};

const keywordDefaultDate = {
  startDate: today.subtract(7, 'd'),
  endDate: today,
};
const keywordDefaultCompareDate = getCompareDate(
  CompareOptionId.PREV_PERIOD,
  7,
  keywordDefaultDate,
);
export const marketing = {
  costEfficiency: { productGroup: null, product: null, yyyymm: aMonthAgo },
  atl: {
    category1: '제품',
    category2: null,
    category3: null,
    yyyymm: aMonthAgo,
  },
  keywordAnalysis: {
    productGroup: '정수기',
    searchType: SearchType.month,
    startYyyymmdd: keywordDefaultDate.startDate,
    endYyyymmdd: keywordDefaultDate.endDate,
    compStartYyyymmdd: keywordDefaultCompareDate.startDate,
    compEndYyyymmdd: keywordDefaultCompareDate.endDate,
    isCompare: true,
  },
  digital: {
    orderType: '총주문',
    category1: '제품',
    category2: null,
    category3: null,
    searchType: SearchType.month,
    startYyyymmdd: keywordDefaultDate.startDate,
    endYyyymmdd: keywordDefaultDate.endDate,
    compStartYyyymmdd: keywordDefaultCompareDate.startDate,
    compEndYyyymmdd: keywordDefaultCompareDate.endDate,
    isCompare: true,
  },
};
