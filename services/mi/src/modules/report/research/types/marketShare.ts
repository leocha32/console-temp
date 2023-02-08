import { HalfYear } from '$constants/enum';
import {
  CompetitorComparison,
  CowayMarketShare,
  MajorBrandMarketShare,
  MarketShare,
  ProductPenetration,
} from '$modules/mi-console-report-api';

/** 시장 점유율 요청 필드 */
export type TMarketShareParams = {
  year: string;
  half: HalfYear;
  'product-groups'?: string;
};

export type TMarketShare = MarketShare;

export type TCowayMarketShare = CowayMarketShare;

export type TCompetitorComparison = CompetitorComparison;

export type TMajorBrandMarketShare = MajorBrandMarketShare;

export type TProductPenetration = ProductPenetration;
