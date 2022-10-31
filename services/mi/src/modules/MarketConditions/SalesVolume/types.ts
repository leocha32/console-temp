import { IResearchReportFile } from 'types/common';

export interface ISalesVolumeParams {
  year: string;
  'product-groups'?: string;
}

export interface IResearchSalesVolumeResponseDto {
  /**
   * 시판 판매량
   */
  salesVolume: ISalesVolume;
}

export interface ISalesVolume {
  description: string;
  /**
   * 시장 규모
   */
  marketSpread: IMarketSpread[];
  /**
   * 브랜드 점유율 (판매량 기준 / 매출액 기준)
   */
  marketShareByBrand: IMarketShareByBrand[];
  /**
   * 리포트 파일
   */
  researchReportFile: IResearchReportFile;
}

export interface IMarketSpread {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연간 판매량
   */
  annualSalesVolume: number;
  /**
   * 연간 매출액
   */
  annualSalesValue: number;
  /**
   * 전년 핀매량
   */
  salesVolumeYoy: number;
  /**
   * 전년 대비 핀매량 증가율
   */
  salesVolumeYoyDiff: number;
  /**
   * 전년 매출액
   */
  salesValueYoy: number;
  /**
   * 전년 대비 매출액 증가율
   */
  salesValueYoyDiff: number;
}

export interface IMarketShareByBrand {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연도
   */
  year: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 판매량 기준 시장 점유율
   */
  marketShareBySalesVolume: number;
  /**
   * 매출액 기준 시장 점유율
   */
  marketShareBySalesValue: number;
}
