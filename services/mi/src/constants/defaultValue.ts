import dayjs from 'dayjs';
import { HalfYear } from '$constants/enum';

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
export const marketing = {
  costEfficiency: { productGroup: null, product: null, yyyymm: aMonthAgo },
  atl: {
    category1: '제품',
    category2: null,
    category3: null,
    yyyymm: aMonthAgo,
  },
  digital: { productGroup: null, product: null, yyyymm: aMonthAgo },
};
