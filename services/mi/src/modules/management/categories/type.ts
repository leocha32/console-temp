import { CategorySummary } from '$modules/mi-console-report-api';

export type TCategorySummary = CategorySummary;
export interface ICategories {
  [key: string]: {
    [key: string]: {
      functionalGroup: string[];
      product: {
        all: string[];
      };
      seqNum: number;
    };
  };
}
