import {
  AccountStatusResponseDto,
  MonthlyAccountStatusRow,
  RentalIndicator,
} from '$modules/mi-console-report-api';

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

export type TAccountStatusResponseDto = AccountStatusResponseDto;

export type TRentalIndicator = RentalIndicator;
export type TMonthlyAccountStatusRow = MonthlyAccountStatusRow;
