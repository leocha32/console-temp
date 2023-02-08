import { HalfYear } from '$constants/enum';
import {
  BrandAwareness,
  CowayBrandAwareness,
  MajorBrandAwareness,
} from '$modules/mi-console-report-api';

export interface IBrandAwarenessParams {
  year: string;
  half: HalfYear;
  'product-groups'?: string;
}

export type TBrandAwareness = BrandAwareness;
export type TCowayBrandAwareness = CowayBrandAwareness;
export type TMajorBrandAwareness = MajorBrandAwareness;
