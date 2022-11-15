import React, { useCallback, useState } from 'react';
import { Button, JustifyContent, Table } from 'mi-ui/src';
import { ISalesVolumeSummary, useDownloadReport } from '$modules/report';
import { ROW_OPTIONS, PRODUCT_ORDER, COLUMN } from './SalesVolumeTableConfigs';
import { Contents, Title } from './commonStyled';

export type TSalesVolumeTableProps = Partial<ISalesVolumeSummary>;

const columnDataToRowData = (data, orderStandard) => {
  const orderedData = orderStandard.map(
    (prodName) => data.find(({ productGroup }) => productGroup === prodName) || {},
  );

  return Object.keys(orderedData[0]).map((key) => {
    return {
      name: key,
      data: orderedData.map((od) => {
        return {
          colName: key,
          value: od[key],
        };
      }),
    };
  });
};

const brandShareRankToRowData = (data, orderStandard) => {
  const orderedData = orderStandard.map(
    (prodName) => data.find(({ productGroup }) => productGroup === prodName) || {},
  );

  const keys = Object.keys(orderedData[0]);
  const brandShareRanks: any = [];
  for (const key of keys) {
    brandShareRanks.push({
      name: key,
      data: orderedData.map(
        ({ msBySalesVolume, msBySalesValue, msBySalesValueRank, productGroup }) => {
          const value =
            key === 'msBySalesVolume'
              ? `${msBySalesVolume},${msBySalesVolume}`
              : `${msBySalesValue},${msBySalesValueRank}`;
          return {
            colName: productGroup,
            value: value,
          };
        },
      ),
    });
  }
  return brandShareRanks;
};

const makeRowData = ({ cowaySales, brandShareRank }) => {
  if (cowaySales.length === 0 || brandShareRank.length === 0) return [];
  const summaryData = [
    ...columnDataToRowData(cowaySales, PRODUCT_ORDER),
    ...brandShareRankToRowData(brandShareRank, PRODUCT_ORDER),
  ];
  return ROW_OPTIONS.map((options) => {
    const data = summaryData.find(({ name }) => name === options.name);
    return {
      ...data,
      ...options,
    };
  });
};

const SalesVolumeTable = ({
  cowaySales,
  brandShareRank,
  researchReportFile,
}: TSalesVolumeTableProps) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const downloadReport = useDownloadReport();

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

  const rowData = makeRowData({ cowaySales, brandShareRank });

  return (
    <Contents>
      <Title>시판 판매량(PoS)</Title>
      <Button
        onClick={handleDownloadReport}
        label={'보고서 다운로드'}
        showLoading={btnLoading}
        justifyContent={JustifyContent.RIGHT}
        disabled={!researchReportFile}
      ></Button>
      <Table
        sx={{ gridRowStart: 2, gridColumn: '1/3' }}
        showHeader={false}
        rows={rowData}
        columns={COLUMN}
      ></Table>
    </Contents>
  );
};
export default SalesVolumeTable;
