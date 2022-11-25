export interface IIAccountOwnershipParams extends IAccountCombinationParams {
  'customer-type'?: string;
}
export interface IAccountCombinationParams {
  'contract-type'?: string;
  year: number;
  month: number;
}

export interface IAccountCombinationResponseDto {
  /**
   * 계정 보유 조합
   */
  accountCombination: IAccountCombination;
}

export interface IAccountCombination {
  /**
   * 계정 보유 조합 (2,3,4 계정)
   */
  productCombinationRows: IProductCombinationRow[];
}

export interface IProductCombinationRow {
  /**
   * 순번
   */
  order: number;
  /**
   * 계정 조합 수 그룹
   */
  accountCountGroup: string;
  /**
   * 제품 1
   */
  product1: string;
  /**
   * 제품 2
   */
  product2: string;
  /**
   * 제품 3
   */
  product3: string;
  /**
   * 제품 4
   */
  product4: string;
  /**
   * 고객 수
   */
  customerCount: number;
  /**
   * 비율
   */
  customerRate: number;
}

export interface IAccountOwnershipDetailsResponseDto {
  /**
   * 계정 보유 조합 상세
   */
  accountOwnershipDetails: IAccountOwnershipDetails;
}

export interface IAccountOwnershipDetails {
  /**
   * 계정 및 판매 | 계정 보유 조합 | 상세 데이터 (다운로드)
   */
  accountOwnershipDetailRows: IAccountOwnershipDetailsRow[];
}

export interface IAccountOwnershipDetailsRow {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 고객 타입
   */
  customerType: string;
  /**
   * 계정 수 그룹
   */
  accountCountGroup: string;
  /**
   * 고객 수
   */
  customerCount: number;
  /**
   * 정수기 수
   */
  cnt001: number;
  /**
   * 청정기 수
   */
  cnt002: number;
  /**
   * 비데 수
   */
  cnt003: number;
  /**
   * 매트리스 수
   */
  cnt004: number;
  /**
   * 전기레인지 수
   */
  cnt005: number;
  /**
   * 연수기 수
   */
  cnt006: number;
  /**
   * 의류청정기 수
   */
  cnt007: number;
  /**
   * 안마의자 수
   */
  cnt008: number;
  /**
   * 기타
   */
  cnt009: number;
}
