import {
  ATLMediaCostByCompanyStatus,
  ATLMediaCostStatus,
  ATLMediaPerformanceStatus,
  MarketingATLResponseDto,
  MediaCostByCompany,
  PerformanceByMedia,
  ShareByCompany,
} from '$modules/mi-console-report-api';

export type TMarketingATLResponseDto = MarketingATLResponseDto;

export type TATLMediaCostStatus = ATLMediaCostStatus;

export type TATLMediaPerformanceStatus = ATLMediaPerformanceStatus;

export type TATLMediaCostByCompanyStatus = ATLMediaCostByCompanyStatus;

export type TShareByCompany = ShareByCompany;

export type TPerformanceByMedia = PerformanceByMedia;

export type TMediaCostByCompany = MediaCostByCompany;

export interface IAtlRequestParams extends IAtlParams {
  category1: string;
  category2?: string;
  category3?: string;
}

export interface IAtlParams {
  year: number;
  month: number;
}
