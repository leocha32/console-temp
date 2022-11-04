import { IResearchReportFile } from '$types/common';
import { HalfYear } from '$constants/enum';

export interface IBrandAwarenessParams {
  year: string;
  half: HalfYear;
  'product-groups'?: string;
}

export interface IResearchBrandAwarenessResponseDto {
  /**
   * 브랜드 인지도
   */
  brandAwareness: IBrandAwareness;
}

export interface IBrandAwareness {
  description: string;
  /**
   * 코웨이 브랜드 인지도
   */
  cowayBrandAwareness: ICowayBrandAwareness[];
  /**
   * 주요 브랜드 인지도
   */
  majorBrandAwareness: IMajorBrandAwareness[];
  /**
   * 리포트 파일
   */
  researchReportFile: IResearchReportFile;
}

export interface ICowayBrandAwareness {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 직전 반기 최초 상기도
   */
  topOfMindHoh: number;
  /**
   * 직전 반기 최초 상기도 차이
   */
  topOfMindHohDiff: number;
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 직전 반기 비보조 인지도
   */
  unaidedAwarenessHoh: number;
  /**
   * 직전 반기 비보조 인지도 차이
   */
  unaidedAwarenessHohDiff: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
  /**
   * 직전 반기 보조 인지도
   */
  aidedAwarenessHoh: number;
  /**
   * 직전 반기 보조 인지도 차이
   */
  aidedAwarenessHohDiff: number;
}

export interface IMajorBrandAwareness {
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
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
}
