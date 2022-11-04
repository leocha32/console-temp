import React, { useCallback } from 'react';
import { Table, Button } from 'mi-ui';
import { IBrandAwarenessSummary } from '$modules/report';
import { ROW_OPTIONS, PRODUCT_ORDER, COLUMN } from './BrandAwarenessTableConfig';
import { Contents, Title } from './commonStyled';
import { useDownloadReport } from '$modules/report';

import { CircularProgress } from '@mui/material';
const cowayBrandAwarenessToRowData = (data, orderStandard) => {
  const brandShareRanks: any = [];
  const orderedData = orderStandard.map(
    (prodName) => data.find(({ productGroup }) => productGroup === prodName) || {},
  );
  const keys = Object.keys(orderedData[0]);

  for (const key of keys) {
    if (key === 'topOfMindRank') continue;

    brandShareRanks.push({
      name: key,
      data: orderedData.map(({ topOfMind, topOfMindRank, ...data }) => {
        return {
          colName: key,
          value: key === 'topOfMind' ? `${topOfMind},${topOfMindRank}` : data[key],
        };
      }),
    });
  }
  return brandShareRanks;
};

const getMindTops = (topOfMindRank) => {
  const ranks = [...new Set(topOfMindRank.map(({ topOfMindRank }) => topOfMindRank))];

  /**
   * 제품 별로 데이터 정렬 후 순위 별 Row 데이터로 정렬
   */
  const rankData = ranks.map((rank) => {
    const divisionRanks = topOfMindRank.filter(
      ({ topOfMindRank }) => topOfMindRank === rank,
    );

    return PRODUCT_ORDER.map((productName) => {
      return divisionRanks.find(({ productGroup }) => productGroup === productName);
    }).map((product) => {
      if (!product) return '';
      const { brand, topOfMind, topOfMindRank, productGroup } = product;
      return {
        colName: productGroup,
        value: `${topOfMindRank},${brand},${topOfMind}`,
      };
    });
  });
  return {
    name: 'topOfMindRank',
    data: rankData,
  };
};

const makeRowData = (cowayBrandAwareness, topOfMindRank) => {
  if (cowayBrandAwareness.length === 0 || topOfMindRank.length === 0) return [];
  const brandRowData = cowayBrandAwarenessToRowData(cowayBrandAwareness, PRODUCT_ORDER);
  const mindTops = getMindTops(topOfMindRank);
  const summaryData = [...brandRowData, mindTops];
  return ROW_OPTIONS.map((options) => {
    const data = summaryData.find(({ name }) => name === options.name);
    return {
      ...data,
      ...options,
    };
  });
};

const BrandAwarenessTable = ({
  cowayBrandAwareness,
  topOfMindRank,
  researchReportFile,
}: IBrandAwarenessSummary) => {
  const downloadReport = useDownloadReport();

  const handleDownloadReport = useCallback(() => {
    if (researchReportFile) {
      const { half, category, filePath, year, originalFileName } = researchReportFile;
      downloadReport.mutate({
        half,
        category,
        filePath,
        year,
        fileName: originalFileName,
      });
    }
  }, [researchReportFile, downloadReport]);

  const rowData = makeRowData(cowayBrandAwareness, topOfMindRank);

  return (
    <Contents>
      <Title>브랜드 인지도</Title>
      <Button
        onClick={handleDownloadReport}
        sx={{ width: 'fit-content', placeSelf: 'end' }}
      >
        보고서 다운로드
      </Button>
      <Table
        sx={{ gridRowStart: 2, gridColumn: '1/3' }}
        showHeader={false}
        row={rowData}
        columns={COLUMN}
        emptyHeight={'300px'}
      ></Table>
    </Contents>
  );
};
export default BrandAwarenessTable;
