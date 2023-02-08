import React, { useCallback } from 'react';
import { Table, Button } from 'mi-ui';
import { TBrandAwarenessSummary } from '$modules/report/research';
import { ROW_OPTIONS, PRODUCT_ORDER, COLUMN } from './BrandAwarenessTableConfig';
import { Card, CardTitle } from '$pages/Report/commonStyled';
import { Header } from './commonStyled';

type TBrandAwarenessTable = {
  data?: TBrandAwarenessSummary;
};

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

const makeRowData = (data: TBrandAwarenessSummary) => {
  const { cowayBrandAwareness, topOfMindRank } = data;
  if (!cowayBrandAwareness.length || !topOfMindRank.length) return [];
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

const BrandAwarenessTable = ({ data }: TBrandAwarenessTable) => {
  const rowData = makeRowData(data || ({} as TBrandAwarenessSummary));
  const downloadReport = useCallback(() => {
    window.open(data?.researchReportFileUrl?.fileUrl, '_blank');
  }, [data?.researchReportFileUrl]);
  return (
    <Card>
      <Header>
        <CardTitle>브랜드 인지도</CardTitle>
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
export default BrandAwarenessTable;
