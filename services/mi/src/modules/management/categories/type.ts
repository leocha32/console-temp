export interface ICategory {
  /**
   * category1, 제품 | 제품외
   */
  category1: string;
  /**
   * category2, 제품의 경우 제품군, 제품 외의 경우 서비스 혹은 브랜드
   */
  category2: string;
  /**
   * 제품의 경우 제품 이름, 제품 외의 경우 서비스 명 혹은 브랜드 (기업 PR)
   */
  category3: string;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface ICategorySummary extends ICategory {
  /**
   * 제품의 경우 기능군, 제품 외의 경우는 NULL
   */
  functionalGroup: string;
}

export interface ICategories {
  [key: string]: any;
}
