import React, { useCallback, useState } from 'react';
import { Button, ISelectProps, Select } from 'mi-ui';
import { ButtonsWrap, Header as CHeader } from '$pages/Report/commonStyled';
import { useDownloadReport } from '$modules/report';
import { IResearchReportFile } from '$types/common';
import { saveImage } from '$utils/utils';
import { css } from '@emotion/react';

export interface IHeaderProps {
  researchReportFile?: IResearchReportFile;
  selectYear: string;
  selectOptions: ISelectProps['options'];
  onChangeSelect: ISelectProps['onChange'];
  element: HTMLElement;
  title: string;
  hiddenCaptureButton?: boolean;
  hiddenReportButton?: boolean;
}
export const Header = ({
  researchReportFile,
  selectYear,
  onChangeSelect,
  selectOptions,
  element,
  title,
  hiddenCaptureButton = false,
  hiddenReportButton = false,
}: IHeaderProps) => {
  const downloadReport = useDownloadReport();
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDownloadScreen = useCallback(() => {
    const fileName = `${title}(${selectYear}).png`;
    saveImage(element, fileName);
  }, [selectYear, element, title]);
  const handleDownloadReport = useCallback(() => {
    if (researchReportFile) {
      setBtnLoading(true);

      const { half, category, filePath, year, originalFileName } = researchReportFile;

      downloadReport.mutate(
        {
          half,
          category,
          filePath,
          year,
          fileName: originalFileName,
        },
        {
          onSettled: () => {
            setBtnLoading(false);
          },
        },
      );
    }
  }, [researchReportFile, downloadReport]);

  return (
    <CHeader id={'component-header'}>
      <Select
        css={css`
          place-self: center;
        `}
        options={selectOptions}
        onChange={onChangeSelect}
        value={selectYear}
        title={'조회 시기'}
      />

      <ButtonsWrap>
        {!hiddenCaptureButton && (
          <Button
            data-html2canvas-ignore
            onClick={handleDownloadScreen}
            label={'화면 다운로드'}
          ></Button>
        )}
        {!hiddenReportButton && (
          <Button
            data-html2canvas-ignore
            onClick={handleDownloadReport}
            disabled={!researchReportFile}
            showLoading={btnLoading}
            label={'보고서 다운로드'}
          ></Button>
        )}
      </ButtonsWrap>
    </CHeader>
  );
};
