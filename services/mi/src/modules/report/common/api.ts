import api from '$utils/api';
import { IReportDownloadRequestParams } from '$modules/report/common/types';
import { downloadFile } from '$utils/utils';

export async function downloadReport({
  year,
  category,
  filePath,
  half,
  fileName,
}: IReportDownloadRequestParams) {
  const { data } = await api({
    url: `/v2/api/console/report/research/download/${category}`,
    method: 'get',
    responseType: 'blob',
    params: {
      year,
      half,
      'file-path': filePath,
    },
  });
  downloadFile(data, fileName);
}
