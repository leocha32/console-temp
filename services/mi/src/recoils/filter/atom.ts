import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import {
  research as researchDefaultValue,
  account as accountDefaultValue,
  marketing as marketingDefaultValue,
} from '$constants/defaultValue';

const { persistAtom } = recoilPersist({
  key: 'filter',
  storage: sessionStorage,
});

export const researchSummary = atom({
  key: 'research-summary',
  default: researchDefaultValue.summary,
  effects: [persistAtom],
});

export const researchMarketShare = atom({
  key: 'research-market-share',
  default: researchDefaultValue.marketShare,
  effects: [persistAtom],
});

export const researchSalesVolume = atom({
  key: 'research-sales-volume',
  default: researchDefaultValue.salesVolume,
  effects: [persistAtom],
});

export const researchBrandAwareness = atom({
  key: 'research-brand-awareness',
  default: researchDefaultValue.brandAwareness,
  effects: [persistAtom],
});

export const accountAccountStatus = atom({
  key: 'account_account_status-filter',
  default: accountDefaultValue.accountStatus,
  effects: [persistAtom],
});

export const accountAccountCombine = atom({
  key: 'account_account_combine-filter',
  default: accountDefaultValue.accountCombine,
  effects: [persistAtom],
});

export const marketingAtl = atom({
  key: 'marketing-atl-filter',
  default: marketingDefaultValue.atl,
  effects: [persistAtom],
});

export const marketingCostEfficiency = atom({
  key: 'marketing-cost-efficiency-filter',
  default: marketingDefaultValue.costEfficiency,
  effects: [persistAtom],
});

export const marketingKeywordAnalysis = atom({
  key: 'marketing-keyword-analysis-filter',
  default: marketingDefaultValue.keywordAnalysis,
  effects: [persistAtom],
});

export const marketingDigital = atom({
  key: 'marketing-digital-filter',
  default: marketingDefaultValue.digital,
  effects: [persistAtom],
});
