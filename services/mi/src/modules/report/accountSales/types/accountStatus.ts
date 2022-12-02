export interface IAccountStatusRequestParams extends IAccountStatusParams {
  'customer-type'?: string;
  'contract-type'?: string;
  'product-groups'?: string;
  'function-groups'?: string;
  products?: string;
}

export interface IAccountStatusParams {
  year: number;
  month: number;
}

export interface IAccountStatusResponseDto {
  /**
   * 계정 수
   */
  accountStatus: IAccountStatus;
  /**
   * 렌탈 지표
   */
  rentalIndicator: IRentalIndicator;
}

export interface IAccountStatus {
  /**
   * 월별 계정 수
   */
  monthlyAccountStatusRows: IMonthlyAccountStatusRow[];
}

export interface IRentalIndicator {
  /**
   * 월별 렌탈 지표
   */
  monthlyRentalIndicatorRows: IMonthlyRentalIndicatorRow[];
  /**
   * 렌탈 지표 평균
   */
  rentalIndicatorAverage: IRentalIndicatorRow;
}
export interface IMonthlyAccountStatusRow {
  /**
   * 연도/월
   */
  yearMonth: string;
  /**
   * 범례
   */
  legend: string;
  /**
   * 계정 수
   */
  count: number;
  /**
   * 비율
   */
  rate: number;
}

export interface IMonthlyRentalIndicatorRow {
  /**
   * 연도/월
   */
  yearMonth: string;
  /**
   * 값
   */
  rentalIndicatorRow: IRentalIndicatorRow;
}

export interface IRentalIndicatorRow {
  /**
   * 계정 해약률 (%)
   */
  cancelRate: number;
}
