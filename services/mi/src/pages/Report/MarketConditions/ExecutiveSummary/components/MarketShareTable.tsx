import React, { useMemo, useCallback } from 'react';
import { Table, TRowProps, Button } from 'mi-ui';
import { ROW_OPTIONS, VALUE_ORDER, COLUMN } from './MarketShareTableConfigs';
import { IExecutiveMarketShare } from '$modules/report/research';
import { Card, CardTitle } from '$pages/Report/commonStyled';
import { Header } from './commonStyled';
export interface IMarketShareTableProps {
  data?: IExecutiveMarketShare;
}

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
  return findByProdName?.productPenetrationValue;
};

/**
 * API 데이터를 Column 기준에서 Row 기준으로 변경
 * @param data
 */
const makeRowData = (data: IExecutiveMarketShare) => {
  const { productPenetration, cowayMarketShare, marketShareRank } = data;
  if (!productPenetration.length || !cowayMarketShare.length || !marketShareRank.length)
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

const MarketShareTable = ({ data }: IMarketShareTableProps) => {
  const rowData = useMemo(() => {
    return makeRowData(data || ({} as IExecutiveMarketShare));
  }, [data]);

  const downloadReport = useCallback(() => {
    window.open(data?.researchReportFileUrl?.fileUrl, '_blank');
  }, [data?.researchReportFileUrl]);
  return (
    <Card>
      <Header>
        <CardTitle>시장 점유율(M/S)</CardTitle>
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

export default MarketShareTable;
