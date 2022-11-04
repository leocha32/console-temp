import { IResearchReportFile } from '$types/common';
import { HalfYear } from '$constants/enum';

/** 시장 점유율 요청 필드 */
export type TMarketShareParams = {
  year: string;
  half: HalfYear;
  'product-groups'?: string;
};

export interface IResearchMarketShareResponseDto {
  /**
   * 시장 점유율
   */
  marketShare: IMarketShare;
}

export interface IMarketShare {
  description: string;
  /**
   * 코웨이 시장 점유율
   */
  cowayMarketShare: ICowayMarketShare[];
  /**
   * 타 브랜드 와의 비교
   */
  competitorComparison: ICompetitorComparison[];
  /**
   * 주요 브랜드 시장 점유율 (반기별)
   */
  majorBrandMarketShare: IMajorBrandMarketShare[];
  /**
   * 제품 보급률
   */
  productPenetration: IProductPenetration[];
  /**
   * 리포트 파일
   */
  researchReportFile: IResearchReportFile;
}

export interface ICowayMarketShare {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 전년 동기 시장 점유율
   */
  marketShareYoyValue: number;
  /**
   * 전년 동기 대비 차이
   */
  yoyDiff: number;
}

export interface ICompetitorComparison {
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
   * 시장 점유율 격차
   */
  gapWithCoway: number;
  /**
   * 시장 점유율 순위
   */
  marketShareRank: number;
}

export interface IMajorBrandMarketShare {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 년도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 시장 점유율 순위
   */
  marketShareRank: number;
}

export interface IProductPenetration {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품 보급률
   */
  productPenetrationValue: number;
}
