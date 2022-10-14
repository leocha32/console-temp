import { HalfYear } from 'utils/enums';
import { IResearchReportFile } from './common';

export interface IResearchSummaryResponseDto {
  /**
   * 시장 점유율 요약
   */
  marketShareSummary: IMarketShareSummary;
  /**
   * 시판 판매량 요약
   */
  salesVolumeSummary: ISalesVolumeSummary;
  /**
   * 브랜드 점유율 요약
   */
  brandAwarenessSummary: IBrandAwarenessSummary;
}

export interface IMarketShareSummary {
  description: string;
  /**
   * 코웨이 시장 점유율
   */
  cowayMarketShare: ICowayMarketShareSummary[];
  /**
   * 제품 보급률
   */
  productPenetration: IProductPenetrationSummary[];
  /**
   * 시장 점유율 랭킹
   */
  marketShareRank: IMarketShareRankSummary[];
  /**
   * 보고서 파일
   */
  researchReportFile: IResearchReportFile;
}

export interface ISalesVolumeSummary {
  description: string;
  /**
   * 코웨이 판매량 및 매출액
   */
  cowaySales: ICowaySummary[];
  /**
   * 브랜드 점유율 및 순위
   */
  brandShareRank: IBrandShareRankSummary[];
  /**
   * 보고서 파일
   */
  researchReportFile: IResearchReportFile;
}

export interface IBrandAwarenessSummary {
  description: string;
  /**
   * 코웨이 브랜드 인지도
   */
  cowayBrandAwareness: ICowayBrandAwarenessSummary[];
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: [];
  /**
   * 보고서 파일
   */
  researchReportFile: IResearchReportFile;
}

export interface ICowayMarketShareSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 당사 시장 점유율
   */
  marketShareValue: number;
  /**
   * 시장 점유율 순위
   */
  marketShareRank: number;
  /**
   * 당사 비교 시장 점유율
   */
  marketShareHohValue: number;
  /**
   * 당사 직전 반기 대비 차이
   */
  hohDiff: number;
}

export interface IProductPenetrationSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품 보급률
   */
  productPenetrationValue: number;
}

export interface IMarketShareRankSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 점유율 순위
   */
  marketShareRank: number;
}

export interface ICowaySummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연간 판매량
   */
  salesVolume: number;
  /**
   * 연간 매출액
   */
  salesValue: number;
}

export interface IBrandShareRankSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드 점유율 (판매량 기준)
   */
  msBySalesVolume: number;
  /**
   * 브랜드 점유율 (판매량 기준) 순위
   */
  msBySalesVolumeRank: number;
  /**
   * 브랜드 점유율 (매출액 기준)
   */
  msBySalesValue: number;
  /**
   * 브랜드 점유율 (매출액 기준) 순위
   */
  msBySalesValueRank: number;
}

export interface ICowayBrandAwarenessSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
}

export interface ITopOfMindRankSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: number;
}

/** 시장 점유율 요약 요청 필드 */
export interface IResearchSummaryRequestField {
  year: string;
  half: HalfYear;
}
