import React, { useCallback, useState } from 'react';
import { Button, ISingleSelectProps, SingleSelect as Select } from 'mi-ui/src';
import { ButtonsWrap, Header as CHeader } from './commonStyled';
import { useDownloadReport } from '$modules/report';
import { IResearchReportFile } from '$types/common';
import { saveImage } from '$utils/utils';
import { css } from '@emotion/react';

export interface IHeaderProps {
  researchReportFile?: IResearchReportFile;
  selectYear: string;
  selectOptions: ISingleSelectProps['options'];
  onChangeSelect: (value: unknown) => void;
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
        defaultValue={selectOptions![0]}
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
