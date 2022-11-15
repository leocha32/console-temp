import React, { useMemo, useCallback, useState } from 'react';
import { Table, Button, TRowProps, JustifyContent } from 'mi-ui';
import { ROW_OPTIONS, VALUE_ORDER, COLUMN } from './MarketShareTableConfigs';
import { IExecutiveMarketShare, useDownloadReport } from '$modules/report';
import { Contents, Title } from './commonStyled';

export type TMarketShareTableProps = Partial<IExecutiveMarketShare>;

const PRODUCT_ORDER = COLUMN.filter((col) => col.name !== 'rowHeader');

/**
 *
 * @param marketShareRank
 * 브랜드 점유율 데이터
 *
 */
const getBrandTops = (marketShareRank) => {
  const ranks = [
    ...new Set(marketShareRank.map(({ marketShareRank }) => marketShareRank)),
  ];

  /**
   * 제품 별로 데이터 정렬 후 순위 별 Row 데이터로 정렬
   */
  return ranks.map((rank) => {
    const divisionRanks = marketShareRank.filter(
      ({ marketShareRank }) => marketShareRank === rank,
    );
    return PRODUCT_ORDER.map(({ name }) => {
      return divisionRanks.find(({ productGroup }) => productGroup === name);
    }).map((product) => {
      const { brand, marketShareValue, marketShareRank } = product;
      return {
        colName: product.productGroup,
        value: `${marketShareRank},${brand},${marketShareValue}`,
      };
    });
  });
};

/**
 * 제품 보급률 데이터
 * @param productPenetration
 * @param productName
 */
const getProductPenetration = ({ productPenetration, productName }) => {
  const findByProdName = productPenetration.find(
    ({ productGroup }) => productGroup === productName,
  );
  return findByProdName.productPenetrationValue;
};

/**
 * API 데이터를 Column 기준에서 Row 기준으로 변경
 * @param cowayMarketShare
 * @param marketShareRank
 * @param productPenetration
 */
const makeRowData = ({ cowayMarketShare, marketShareRank, productPenetration }) => {
  if (
    marketShareRank.length === 0 ||
    cowayMarketShare.length === 0 ||
    productPenetration.length === 0
  )
    return [];
  /**
   * SB 기준으로 데이터 순서 정렬
   * Row 기준으로 데이터 정렬
   */
  const orderedData = PRODUCT_ORDER.map(({ name }) => {
    const productPenetrationValue = getProductPenetration({
      productPenetration,
      productName: name,
    });

    for (const market of cowayMarketShare) {
      const { productGroup, marketShareRank, marketShareValue, hohDiff } = market;
      if (productGroup === name) {
        return {
          marketShareRank: `${marketShareValue},${marketShareRank}`,
          hohDiff: hohDiff,
          productGroup: productGroup,
          productPenetration: productPenetrationValue,
        };
      }
    }
  });

  /**
   * Row Option 추가
   */
  return VALUE_ORDER.map((key) => {
    const option = ROW_OPTIONS.find(({ name }) => key === name);
    const row: TRowProps = {
      name: key,
      data: orderedData.map((s) => {
        return {
          colName: s ? s.productGroup : '',
          value: s ? s[key] : '',
        };
      }),
      label: '',
    };
    if (option?.options) row['options'] = option.options;
    if (key === 'brandShare') row['data'] = getBrandTops(marketShareRank);
    if (option?.label) row['label'] = option.label;
    return row;
  });
};

const MarketShareTable = ({
  researchReportFile,
  cowayMarketShare,
  productPenetration,
  marketShareRank,
}: TMarketShareTableProps) => {
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

  const rowData = useMemo(() => {
    return makeRowData({
      cowayMarketShare,
      marketShareRank,
      productPenetration,
    });
  }, [cowayMarketShare, productPenetration, marketShareRank]);

  return (
    <Contents>
      <Title>시장 점유율(M/S)</Title>
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

export default MarketShareTable;
