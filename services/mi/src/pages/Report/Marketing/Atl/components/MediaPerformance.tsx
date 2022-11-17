import React from 'react';

import { Card, Section, CardTitle, ContentWrap } from '$pages/Report/commonStyled';
import {
  IATLMediaPerformanceStatus,
  IPerformanceByMedia,
} from '$modules/report/marketing/atl';
import styled from '@emotion/styled';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
import { Table, TRowData, TRowProps } from 'mi-ui/src';

export interface IMediaPerformanceProps {
  data?: IATLMediaPerformanceStatus;
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
const makeRowData = (originData: IPerformanceByMedia[]) => {
  const mediaObj = {};
  const sumRow = (name, data) => ({
    data,
    label: name,
    name,
    options: {
      colSpan: 2,
    },
  });
  originData.forEach((item) => {
    if (!Object.prototype.hasOwnProperty.call(mediaObj, item.media)) {
      mediaObj[item.media] = {
        data: [],
        sum: item,
      };
    }
    mediaObj[item.media].data.push(item);
  });
  const rowData: TRowProps[] = [];
  Object.keys(mediaObj).forEach((key) => {
    const data = mediaObj[key].data.map((item) => {
      const row: TRowData[] = [];
      tableHeader.forEach(({ key, name }) => {
        if (key === 'media') return;
        row.push({
          colName: name,
          value: item[key] || '-',
        });
      });
      return row;
    });
    rowData.push({
      data,
      label: key,
      name: key,
      options: {
        rowSpan: mediaObj[key].data.length,
      },
    });
    rowData.push(
      sumRow(`${key}계`, [
        { value: 1, colName: '광고비(억원)' },
        { value: 1, colName: '횟수' },
        { value: 1, colName: '당월 누적 GRP' },
        { value: 1, colName: 'CPRP(천원)' },
      ]),
    );
  });
  rowData.push({
    data: [
      { value: 1, colName: '광고비(억원)' },
      { value: 1, colName: '횟수' },
      { value: 1, colName: '당월 누적 GRP' },
      { value: 1, colName: 'CPRP(천원)' },
    ],
    label: '총계',
    name: '총계',
    options: {
      colSpan: 2,
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
      <Section>
        <ContentWrap>
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
        </ContentWrap>
        <ContentWrap flex={2}>
          <Table
            showHeader
            headers={tableHeader}
            rows={rowData}
            columns={columns}
          ></Table>
        </ContentWrap>
      </Section>
    </Card>
  );
};

export default MediaPerformance;
