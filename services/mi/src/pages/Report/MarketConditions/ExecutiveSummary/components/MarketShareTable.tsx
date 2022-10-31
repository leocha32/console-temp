import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Table } from 'mi-ui/src';
import { IExecutiveMarketShare, IMarketShareByBrand } from '$modules/MarketConditions';
import { IMarketShareByBrandProps } from '$pages/Report/MarketConditions/SalesVolume/components';
const Contents = styled.div`
  display: grid;
  grid-template-rows: auto;
  height: fit-content;
`;

/**
 * 당사 점유율(순위)cowayMarketShare.marketShareRank
 * 당사 점유율(퍼센트)cowayMarketShare.marketShareValue
 * 당사 직전 반기 대비 차이 cowayMarketShare.hohDiff
 * 브랜드 점유율 : marketShareRank.marketShareValue
 * 제품보급률 : productPenetration.productPenetrationValue
 * @param data
 */
export interface IMarketShareTableProps {
  data: IExecutiveMarketShare;
}

const makeTableData = (data: IExecutiveMarketShare) => {
  const { cowayMarketShare, marketShareRank, productPenetration } = data;

  const headers = productPenetration.map((prod) => {
    return {
      name: prod.productGroup,
    };
  });
  const rowData = cowayMarketShare.map((marketShare) => {
    const productPenetrationValue = productPenetration.find(
      (prod) => prod.productGroup === marketShare.productGroup,
    )?.productPenetrationValue;

    const row = {
      ...marketShare,
    };
    row['productPenetrationValue'] = productPenetrationValue;
    return row;
  });

  return { headers, rowData };
};

const MarketShareTable = ({ data }: any) => {
  const { headers, rowData } = makeTableData(data);
  // [
  //   {
  //     division: '당사시장점유율 순위',
  //     mat: '232',
  //   },
  // ]
  return (
    <Contents>
      <label>시장 점유율(M/S)</label>
      <Table headers={headers} rowData={rowData} columns={[]}></Table>
    </Contents>
  );
};

MarketShareTable.prototype = {
  data: PropTypes.node.isRequired,
};
export default MarketShareTable;
