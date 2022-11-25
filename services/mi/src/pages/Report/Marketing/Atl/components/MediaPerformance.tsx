import React from 'react';

import { Card, CardTitle, Content, ContentWrap } from '$pages/Report/commonStyled';
import {
  IATLMediaPerformanceStatus,
  IPerformanceByMedia,
} from '$modules/report/marketing';
import styled from '@emotion/styled';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
import { Table, TRowData, TRowProps } from 'mi-ui/src';

export interface IMediaPerformanceProps {
  data: IATLMediaPerformanceStatus;
}

const SubContents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const SubContentWrap = styled.div`
  flex: 1;
  display: flex;
  :not(:last-of-type) {
    border-bottom: ${({ theme }) => `1px solid ${theme.palettes.gray.GRAY_300}`};
    margin-bottom: 20px;
  }
`;

const SubTitle = styled.h4`
  flex-basis: 130px;
`;

const SubData = styled.div`
  color: ${({ theme }) => theme.color.primary.PRIMARY_900};
  font-size: 55px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const columns = [
  {
    name: 'header',
    options: {
      sx: {
        backgroundColor: 'aliceblue',
        width: '20%',
      },
    },
  },
  {
    name: 'sum',
    options: {},
  },
  {
    name: 'ttv',
    options: {},
  },
  {
    name: 'ctv',
    sx: {
      width: '15%',
    },
  },
  {
    name: 'ad',
    sx: {
      width: '15%',
    },
  },
];

const tableHeader = [
  {
    name: '매체',
    key: 'media',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '채널',
    key: 'channel',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '광고비(억원)',
    key: 'cost',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '횟수',
    key: 'ads',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '당월 누적 GRP',
    key: 'grp',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: 'CPRP(천원)',
    key: 'cprp',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
];

const makeColumn = (newData, originData, exclude: string[]) => {
  tableHeader.forEach(({ key, name }) => {
    if (exclude.includes(key)) return;
    newData.push({
      colName: name,
      value: originData[key] || '-',
    });
  });
};

const makeRowData = (originData: IPerformanceByMedia[]) => {
  const mediaObj = {};
  const total = {};
  const sumRow = (name, data) => ({
    data,
    label: name,
    name,
    options: {
      textFormat: (value) => value.toLocaleString('ko-KR'),
      colSpan: 2,
      sx: {
        backgroundColor: '#dbe4ec',
        fontWeight: 600,
      },
    },
  });

  originData.forEach((item) => {
    if (!Object.prototype.hasOwnProperty.call(mediaObj, item.media)) {
      mediaObj[item.media] = {
        data: [],
        sum: {},
      };
    }
    const rows = [];
    makeColumn(rows, item, ['media']);
    mediaObj[item.media].data.push(rows);
    mediaObj[item.media].sum = Object.keys(item).reduce((pre, cur) => {
      pre[cur] = item[cur] + (pre[cur] || 0);
      total[cur] = item[cur] + (total[cur] || 0);
      return pre;
    }, mediaObj[item.media].sum);
  });

  const rowData: TRowProps[] = [];
  const totalData: TRowData[] = [];

  makeColumn(totalData, total, ['media', 'channel']);

  Object.keys(mediaObj).forEach((key) => {
    const sumData = [];
    makeColumn(sumData, mediaObj[key].sum, ['media', 'channel']);
    rowData.push({
      data: mediaObj[key].data,
      label: key,
      name: key,
      options: {
        rowSpan: mediaObj[key].data.length,
        textFormat: (value) => value.toLocaleString('ko-KR'),
      },
    });
    rowData.push(sumRow(`${key}계`, sumData));
  });
  rowData.push({
    data: totalData,
    label: '총계',
    name: '총계',
    options: {
      colSpan: 2,
      textFormat: (value) => value.toLocaleString('ko-KR'),
      sx: {
        backgroundColor: '#84A1C3',
        fontWeight: 600,
      },
    },
  });
  return rowData;
};

const MediaPerformance = ({ data }: IMediaPerformanceProps) => {
  const rowData = data?.performanceByMedia.length
    ? makeRowData(data?.performanceByMedia)
    : [];
  return (
    <Card>
      <CardTitle>ATL 매체 퍼포먼스</CardTitle>
      <ContentWrap>
        <Content>
          <SubContents>
            <SubContentWrap>
              <SubTitle>R3</SubTitle>
              {data?.r3grp?.r3 ? (
                <SubData>{`${data?.r3grp?.r3}%`}</SubData>
              ) : (
                <EmptyContent />
              )}
            </SubContentWrap>
            <SubContentWrap>
              <SubTitle>제품 누적 GRP</SubTitle>
              {data?.r3grp?.grp ? (
                <SubData>{data?.r3grp?.grp?.toLocaleString()}</SubData>
              ) : (
                <EmptyContent />
              )}
            </SubContentWrap>
          </SubContents>
        </Content>
        <Content flex={2}>
          <Table
            showHeader
            headers={tableHeader}
            rows={rowData}
            columns={columns}
          ></Table>
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default MediaPerformance;
