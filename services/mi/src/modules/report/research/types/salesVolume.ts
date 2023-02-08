import {
  MarketShareByBrand,
  MarketSpread,
  SalesVolume,
} from '$modules/mi-console-report-api';

export interface ISalesVolumeParams {
  year: string;
  'product-groups'?: string;
}

export type TSalesVolume = SalesVolume;

export type TMarketSpread = MarketSpread;

export type TMarketShareByBrand = MarketShareByBrand;
