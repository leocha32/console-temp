import {
  AccountCombinationResponseDto,
  ProductCombinationRow,
} from '$modules/mi-console-report-api';

export interface IIAccountOwnershipParams extends IAccountCombinationParams {
  'customer-type'?: string;
}
export interface IAccountCombinationParams {
  'contract-type'?: string;
  year: number;
  month: number;
}

export type TAccountCombinationResponseDto = AccountCombinationResponseDto;

export type TProductCombinationRow = ProductCombinationRow;
