import React, { useCallback } from 'react';
import { Button, Table } from 'mi-ui/src';
import { TSalesVolumeSummary } from '$modules/report/research';
import { ROW_OPTIONS, PRODUCT_ORDER, COLUMN } from './SalesVolumeTableConfigs';

import { Card, CardTitle } from '$pages/Report/commonStyled';
import { Header } from './commonStyled';

export type TSalesVolumeTableProps = {
  data?: TSalesVolumeSummary;
};

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

const makeRowData = (data: TSalesVolumeSummary) => {
  const { cowaySales, brandShareRank } = data;
  if (!cowaySales.length || !brandShareRank.length) return [];
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

const SalesVolumeTable = ({ data }: TSalesVolumeTableProps) => {
  const rowData = makeRowData(data || ({} as TSalesVolumeSummary));

  const downloadReport = useCallback(() => {
    window.open(data?.researchReportFileUrl?.fileUrl, '_blank');
  }, [data?.researchReportFileUrl]);
  return (
    <Card>
      <Header>
        <CardTitle>시판 판매량(PoS)</CardTitle>
        <Button
          disabled={!data?.researchReportFileUrl}
          label={'보고서 다운로드'}
          onClick={downloadReport}
        ></Button>
      </Header>
      <Table showHeader={false} rows={rowData} columns={COLUMN}></Table>
    </Card>
  );
};
export default SalesVolumeTable;
