import { HalfYear, ReportDownLoadCategoryType } from '$constants/enum';
/**  리포트 다운로드 요청 필드 */
export interface IReportDownloadRequestParams {
  category: ReportDownLoadCategoryType;
  year: string;
  half: HalfYear;
  filePath: string;
  fileName: string;
}
