import React from 'react';

import { Card, CardTitle, ContentWrap, Content } from '$pages/Report/commonStyled';
import { ITableContainerProps, Table } from 'mi-ui/src';
import {
  IATLMediaCostByCompanyStatus,
  IMediaCostByCompany,
} from '$modules/report/marketing';
import { css } from '@emotion/react';

export interface ICompetitorExecutionStatusProps {
  data: IATLMediaCostByCompanyStatus;
}
const TABLE_MAX_HEIGHT = 400;

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
    name: '구분',
    key: 'company',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: 'TV매체비계',
    key: 'sum',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '지상파',
    key: 'ttv',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: 'CATV/종편',
    key: 'ctv',
    sx: {
      backgroundColor: 'aliceblue',
    },
  },
  {
    name: '광고링크',
    key: 'ad',
    sx: {
      backgroundColor: 'aliceblue',
      width: '500px',
    },
  },
];

const makeRowData = (originData: IMediaCostByCompany[]): ITableContainerProps['rows'] => {
  return originData
    .sort((a, b) => {
      if (a.company === '코웨이' || b.company === '코웨이') {
        return 1;
      }
      return b.sum - a.sum;
    })
    .map((item) => {
      const data = tableHeader.map(({ key }) => {
        let value = item[key];
        if (key === 'ad') {
          if (item.adUrl) {
            const adUrls = item.adUrl.split('0x0b');
            const adTitles = item.adTitle.split('0x0b');
            value = adUrls.map((link, index) => (
              <a
                key={index}
                css={css`
                  color: #4285f4;
                  display: flex;
                `}
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {adTitles[index]}
              </a>
            ));
          } else value = '';
        }

        return {
          colName: key,
          value,
        };
      });
      return {
        name: item.company,
        data,
        options: {
          height: 'inherit',
        },
      };
    });
};

const CompetitorExecutionStatus = ({ data }: ICompetitorExecutionStatusProps) => {
  const rowData = makeRowData(data?.mediaCostByCompanies || []);
  return (
    <Card>
      <CardTitle>경쟁사 집행 현황</CardTitle>
      <ContentWrap>
        <Content>
          {rowData.length ? (
            <div
              css={(theme) => `
          display: flex;
          font-size: 13px;
          justify-content: end;          
          color: ${theme.palettes.gray.GRAY_600};
          margin-bottom:8px;
        `}
            >
              (단위: 억원)
            </div>
          ) : null}
          <Table
            showHeader
            headers={tableHeader}
            rows={rowData}
            columns={columns}
            sx={{ maxHeight: `${TABLE_MAX_HEIGHT}px` }}
          ></Table>
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default CompetitorExecutionStatus;
