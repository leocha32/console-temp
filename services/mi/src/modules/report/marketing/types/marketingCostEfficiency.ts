import {
  MarketingCostAndEfficiencyStatusResponseDto,
  MarketingCostByMedia,
  MarketingCostByMonth,
  MarketingCostStatus,
  MarketingEfficiencyByMonth,
  MarketingEfficiencyStatus,
} from '$modules/mi-console-report-api';

export type TMarketingCostAndEfficiencyStatusResponseDto =
  MarketingCostAndEfficiencyStatusResponseDto;

export type TMarketingCostStatus = MarketingCostStatus;

export type TMarketingEfficiencyStatus = MarketingEfficiencyStatus;

export type TMarketingCostByMedia = MarketingCostByMedia;

export type TMarketingCostByMonth = MarketingCostByMonth;

export type TMarketingEfficiencyByMonth = MarketingEfficiencyByMonth;

export interface IMarketingCostsEfficiencyRequestParams
  extends IMarketingCostsEfficiencyParams {
  category2?: string;
  category3?: string;
}

export interface IMarketingCostsEfficiencyParams {
  year: number;
  month: number;
}
