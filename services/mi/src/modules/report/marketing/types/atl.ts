export interface IMarketingATLResponseDto {
  /**
   * ATL 매체비 현황
   */
  atlMediaCostStatus: IATLMediaCostStatus;
  /**
   * ATL 매체 퍼포먼스
   */
  atlMediaPerformanceStatus: IATLMediaPerformanceStatus;
  /**
   * 마케팅 비용 현황
   */
  atlMediaCostByCompanyStatus: IATLMediaCostByCompanyStatus;
}

export interface IATLMediaCostStatus {
  /**
   * 월별 매체별 광고비
   */
  monthlyCostByMedia?: IMonthlyCostByMedia[];
  /**
   * 월별 제품군 별 광고비
   */
  monthlyCostByProductGroup?: IMonthlyCostByProductGroup[];
  /**
   * 회사별 광고비 비중
   */
  shareByCompanies?: IShareByCompany[];
}

export interface IATLMediaPerformanceStatus {
  /**
   * R3 & 제품 누적 GRP
   */
  r3grp: IR3Grp;
  /**
   * 매체 별 광고 퍼포먼스
   */
  performanceByMedia: IPerformanceByMedia[];
}

export interface IATLMediaCostByCompanyStatus {
  /**
   * 월별 매체별 광고비
   */
  mediaCostByCompanies: IMediaCostByCompany[];
}

export interface IMonthlyCostByMedia {
  /**
   * 년월
   */
  yearMonth: string;
  /**
   * 매체
   */
  media: string;
  /**
   * 광고비
   */
  cost: number;
}

export interface IMonthlyCostByProductGroup {
  /**
   * 년월
   */
  yearMonth: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 광고비
   */
  cost: number;
}

export interface IShareByCompany {
  /**
   * 회사
   */
  company: string;
  /**
   * 비중
   */
  shareValue: number;
}

export interface IR3Grp {
  /**
   * R3: Reach 3+, 광고에 3번 이상 노출된 타겟 시청자 비율
   */
  r3: number;
  /**
   * 제품 누적 GRP: Gross Rating Points, 일정 기간 동안 광고 캠페인 누적 시청률
   */
  grp: number;
}

export interface IPerformanceByMedia {
  /**
   * 정렬 순서
   */
  seqNum: number;
  /**
   * 매체
   */
  media: string;
  /**
   * 채널
   */
  channel: string;
  /**
   * 광고비
   */
  cost: number;
  /**
   * 광고 횟수
   */
  ads: number;
  /**
   * 당월 누적 GRP
   */
  grp: number;
  /**
   * CPRP: Cost Per Rating Point, 시청률 1% 를 올리기 위한 매체 비용
   */
  cprp: number;
}

export interface IMediaCostByCompany {
  /**
   * 회사
   */
  company: string;
  /**
   * 매체 비용 합
   */
  sum: number;
  /**
   * 지상파
   */
  ttv: number;
  /**
   * 케이블 및 종편
   */
  ctv: number;
  /**
   * 광고 제목
   */
  adTitle: string;
  /**
   * 광고 링크
   */
  adUrl: string;
}

export interface IAtlRequestParams extends IAtlParams {
  category1: string;
  category2?: string;
  category3?: string;
}

export interface IAtlParams {
  year: number;
  month: number;
}
