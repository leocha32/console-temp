import { Card, Content, ContentTitle, ContentWrap } from '$pages/Report/commonStyled';
import { Table, IColumn } from 'mi-ui';
import { ProductHeader } from './tableConfig';
import { marketingDigital } from '$recoils/filter';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { chain, map, get, set, identity } from 'lodash';
import { MediaSourceDetailRow } from '$modules/mi-console-report-api';

const createRowData = () => {
  const groupByDeep = (collection, keys) => {
    return chain(collection)
      .map((item) => map(keys, (key) => get(item, key)))
      .reduce((result, paths, idx) => {
        const items = get(result, paths.join('.'), []);
        set(result, paths.join('.'), [...items, collection[idx]]);
        return result;
      }, {})
      .value();
  };
};

export interface TableSectionProps {
  data: MediaSourceDetailRow[];
}

export const TableSection = ({ data }: TableSectionProps) => {
  const groupByDeep = (collection, keys) => {
    return chain(collection)
      .map((item) => map(keys, (key) => get(item, key)))
      .reduce((result, paths, idx) => {
        const items = get(result, paths.join('.'), []);
        set(result, paths.join('.'), [...items, collection[idx]]);
        return result;
      }, {})
      .value();
  };
  groupByDeep(data, ['adsType', 'media', 'source']);
  const { searchType, ...filter } = useRecoilValue(marketingDigital);
  const [showArea, setShowArea] = useState(false);
  const isProduct = filter.category1 === '제품';
  const clickMedia = () => {
    setShowArea(!showArea);
  };

  return (
    <Card height={500} sx={{ marginTop: '20px' }}>
      <ContentWrap>
        <Content>
          <ContentTitle>매체 및 지면 상세</ContentTitle>
          {isProduct ? (
            <Table
              headers={ProductHeader(showArea, clickMedia, isProduct)}
              rows={[]}
              columns={[]}
              showHeader
            ></Table>
          ) : (
            <Table
              headers={ProductHeader(showArea, clickMedia, isProduct)}
              rows={[]}
              columns={[]}
              showHeader
            ></Table>
          )}
        </Content>
      </ContentWrap>
    </Card>
  );
};
