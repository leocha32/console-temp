import React, { useCallback } from 'react';
import { Button, ISelectProps, Select } from 'mi-ui';
import { ButtonsWrap, Header as CHeader } from '$pages/Report/commonStyled';
import { IResearchReportFileUrl } from '$types/common';
import { saveImage } from '$utils/utils';
import { css } from '@emotion/react';

export interface IHeaderProps {
  researchReportFileUrl?: IResearchReportFileUrl;
  selectYear: string;
  selectOptions: ISelectProps['options'];
  onChangeSelect: ISelectProps['onChange'];
  element: HTMLElement;
  title: string;
  hiddenCaptureButton?: boolean;
  hiddenReportButton?: boolean;
}
export const Header = ({
  researchReportFileUrl,
  selectYear,
  onChangeSelect,
  selectOptions,
  element,
  title,
  hiddenCaptureButton = false,
  hiddenReportButton = false,
}: IHeaderProps) => {
  const handleDownloadScreen = useCallback(() => {
    const fileName = `${title}(${selectYear}).png`;
    saveImage(element, fileName);
  }, [selectYear, element, title]);

  const downloadReport = useCallback(() => {
    window.open(researchReportFileUrl?.fileUrl, '_blank');
  }, [researchReportFileUrl]);

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
            disabled={!researchReportFileUrl}
            label={'보고서 다운로드'}
            onClick={downloadReport}
          ></Button>
        )}
      </ButtonsWrap>
    </CHeader>
  );
};
