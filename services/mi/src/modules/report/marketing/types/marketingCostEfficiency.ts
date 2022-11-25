export interface IMarketingCostAndEfficiencyStatusResponseDto {
  /**
   * 마케팅 비용 현황
   */
  marketingCostStatus: IMarketingCostStatus;
  /**
   * 마케팅 효율
   */
  marketingEfficiencyStatus: IMarketingEfficiencyStatus;
}

export interface IMarketingCostStatus {
  /**
   * 마케팅 비용 (전체)
   */
  marketingCosts: IMarketingCostByMedia[];
  /**
   * 제품군 별 마케팅 비용
   */
  marketingCostBySelectedItems: IMarketingCostBySelectedItem[];
  /**
   * 월별 마케팅 비용
   */
  marketingCostByMonths: IMarketingCostByMonth[];
  /**
   * 전년 동월, 전월 비교
   */
  marketingCostCompare?: IMarketingCostCompare;
}

export interface IMarketingEfficiencyStatus {
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 전체
   */
  marketingEfficiency: IMarketingEfficiency;
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 제품군 별
   */
  marketingEfficiencyByProductGroups: IMarketingEfficiencyByCategory[];
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 제품 별
   */
  marketingEfficiencyByProducts: IMarketingEfficiencyByCategory[];
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 전월, 전년 동월 비교
   */
  marketingEfficiencyCompares: IMarketingEfficiencyCompare[];
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 월 별
   */
  marketingEfficiencyByMonths: IMarketingEfficiencyByMonth[];
}

export interface IMarketingCostByMedia {
  /**
   * 매체
   */
  media: string;
  /**
   * 비용
   */
  cost: number;
}

export interface IMarketingCostBySelectedItem extends IMarketingCostByMedia {
  /**
   * 선택된 항목
   */
  selectedItem: string;
}

export interface IMarketingCostByMonth extends IMarketingCostByMedia {
  /**
   * 년월
   */
  yearMonth: string;
}

export interface IMarketingCostCompare {
  /**
   * 전월 대비
   */
  mom: number;
  /**
   * 전년 동월 대비
   */
  yoy: number;
}

export interface IMarketingEfficiency {
  /**
   * 마케팅 빙용
   */
  cpp: number;
  /**
   * PLT 매출 대비 비중
   */
  percentOfSales: number;
}

export interface IMarketingEfficiencyByCategory extends IMarketingEfficiency {
  /**
   * 카테고리
   */
  category: string;
}

export interface IMarketingEfficiencyCompare {
  /**
   * 타이틀
   */
  title: string;
  /**
   * 전월 대비
   */
  mom: number;
  /**
   * 전년 동월 대비
   */
  yoy: number;
}

export interface IMarketingEfficiencyByMonth extends IMarketingEfficiency {
  /**
   * 년월
   */
  yearMonth: string;
}

export interface IMarketingCostsEfficiencyRequestParams
  extends IMarketingCostsEfficiencyParams {
  category2?: string;
  category3?: string;
}

export interface IMarketingCostsEfficiencyParams {
  year: number;
  month: number;
}
