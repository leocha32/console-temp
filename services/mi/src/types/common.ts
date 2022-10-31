/** 리포트 파일 위치 응답 타입 */
import { HalfYear, ReportDownLoadCategoryType } from 'constants/enum';

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
