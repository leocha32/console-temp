import { HalfYear } from 'utils/enums';

/** 리포트 다운로드 타입  */
export const enum ReportDownLoadCategoryType {
  BrandAwareness = 'BRAND_AWARENESS',
  MarketShare = 'MARKET_SHARE',
  SalesVolume = 'SALES_VOLUME',
}

/** 리포트 파일 위치 응답 타입 */
export interface IResearchReportFile {
  bucket: string;
  projectId: string;
  year: string;
  half: HalfYear;
  category: ReportDownLoadCategoryType;
  filePath: string;
  originalFileName: string;
  updatedTimestamp: number;
  blob: Blob;
}
