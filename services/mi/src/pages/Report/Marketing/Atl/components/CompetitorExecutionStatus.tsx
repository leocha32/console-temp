import React from 'react';
import styled from '@emotion/styled';
import {
  Card,
  CardTitle,
  ContentWrap,
  Content,
  ContentTitle,
} from '$pages/Report/commonStyled';
import InfoIcon from '@mui/icons-material/Info';
import { IPieChartProps, ITableContainerProps, PieChart, Table } from 'mi-ui/src';
import {
  TATLMediaCostByCompanyStatus,
  TMediaCostByCompany,
  TShareByCompany,
} from '$modules/report/marketing';
import { css } from '@emotion/react';

export interface ICompetitorExecutionStatusProps {
  data: TATLMediaCostByCompanyStatus;
  shareByCompanies: TShareByCompany[];
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
      minWidth: '70px',
    },
  },
  {
    name: 'TV매체비계',
    key: 'sum',
    sx: {
      backgroundColor: 'aliceblue',
      minWidth: '70px',
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
      minWidth: '70px',
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

const makeRowData = (originData: TMediaCostByCompany[]): ITableContainerProps['rows'] => {
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

const InfoWrap = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_500};
`;

const makeChartData = (originData: TShareByCompany[]): IPieChartProps['data'] => {
  return {
    data:
      originData
        ?.sort((a, b) => {
          if (a.company === '코웨이' || b.company === '코웨이') {
            return 1;
          }
          return b.shareValue - a.shareValue;
        })
        .map(({ company, shareValue }) => ({
          value: shareValue,
          name: company,
        })) || [],
    label: {
      formatter: '{c}%',
    },
    radius: '50%',
    center: ['50%', '60%'],
  };
};

const CompetitorExecutionStatus = ({
  data,
  shareByCompanies,
}: ICompetitorExecutionStatusProps) => {
  const rowData = makeRowData(data?.mediaCostByCompanies || []);
  const chartData = makeChartData(shareByCompanies);
  return (
    <Card>
      <CardTitle>경쟁사 집행 현황</CardTitle>
      <ContentWrap>
        <Content flex={2}>
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
        <Content>
          <ContentTitle>SOS</ContentTitle>
          <PieChart
            data={chartData}
            tooltip={{
              valueFormatter: (value) => `${value}%`,
            }}
            legend={{
              type: (chartData?.data || []).length > 20 ? 'scroll' : 'plain',
            }}
          />
          <InfoWrap>
            <InfoIcon sx={{ fontSize: 14 }} />
            SOS = Share of Spending (광고비 점유율)
          </InfoWrap>
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default CompetitorExecutionStatus;
