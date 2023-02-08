import {
  OnlinePerformance,
  MarketingDigitalCampaignPerformance,
  MarketingDigitalCampaignPerformanceResponseDto,
  MarketingDigitalCampaignStatus,
  MarketingDigitalCampaignStatusResponseDto,
  FunnelByAttributeTypeRow,
  MediaSourceDetailRow,
  PaidAdsStatus,
  RatioByAdsTypeRow,
} from '$modules/mi-console-report-api';

export type TMarketingDigitalCampaignPerformanceResponseDto =
  MarketingDigitalCampaignPerformanceResponseDto;

export type TMarketingDigitalCampaignPerformance = MarketingDigitalCampaignPerformance;

export type TOnlinePerformance = OnlinePerformance;

export type TMarketingDigitalCampaignStatusResponseDto =
  MarketingDigitalCampaignStatusResponseDto;

export type TMarketingDigitalCampaignStatus = MarketingDigitalCampaignStatus;
export type TFunnelByAttributeTypeRow = FunnelByAttributeTypeRow;
export type TRatioByAdsTypeRow = RatioByAdsTypeRow;
export type TPaidAdsStatus = PaidAdsStatus;
export type TMediaSourceDetailRow = MediaSourceDetailRow;

export interface IDigitalRequestParams {
  'order-type': string;
  category1: string;
  category2: string;
  category3: string;
  from: string;
  to: string;
  'from-comp': string;
  'to-comp': string;
}
