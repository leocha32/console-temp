import { HalfYear } from '$constants/enum';
import {
  BrandAwarenessSummary,
  MarketShareSummary,
  ResearchSummaryResponseDto,
  SalesVolumeSummary,
} from '$modules/mi-console-report-api';

/** 시장 점유율 요약 요청 필드 */
export interface IExecutiveSummaryRequestField {
  year: string;
  half: HalfYear;
}

export type TResearchSummaryResponseDto = ResearchSummaryResponseDto;

export type TMarketShareSummary = MarketShareSummary;

export type TSalesVolumeSummary = SalesVolumeSummary;

export type TBrandAwarenessSummary = BrandAwarenessSummary;
