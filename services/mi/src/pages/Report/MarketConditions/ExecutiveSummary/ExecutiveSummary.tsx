import React, { useEffect, useState, useCallback } from 'react';
import {
  PageLayout,
  SingleSelect,
  ISingleSelectProps,
  Button,
  SingleSelect as Select,
  Spinner,
} from 'mi-ui';
import dayjs from 'dayjs';
import { getCrumbs } from '$utils/utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import MarketShareTable from './components/MarketShareTable';
import BrandAwarenessTable from './components/BrandAwarenessTable';
import SalesVolumeTable from './components/SalesVolumeTable';
import {
  ICowayMarketShareSummary,
  IExecutiveMarketShare,
  IExecutiveSummaryResponseDto,
  IMarketShareRankSummary,
  IProductPenetrationSummary,
  useExecutiveSummary,
  useSalesVolume,
} from '$modules/MarketConditions';
import { IResearchReportFile } from '$types/common';

const ContentContainer = styled.div`
  height: calc(100% - 30px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5% auto 10%;
  grid-gap: 20px;
`;

const TableContainer = styled.div`
  display: grid;
  grid-row: 2/3;
  grid-column: 1/3;
  max-height: 74vh;
  overflow-y: auto;
  grid-gap: 20px;
`;
const currentYear = dayjs().year();

const selectOption = () => {
  const lastYear = 2020;
  const options: { value: string; label: string }[] = [];

  for (let i = currentYear; i >= lastYear; i--) {
    if (currentYear === i) {
      options.push({
        value: String(i) + '/1',
        label: `${i} 상반기`,
      });
    } else {
      options.push(
        {
          value: String(i) + '/1',
          label: `${i} 상반기`,
        },
        {
          value: String(i) + '/2',
          label: `${i} 하반기`,
        },
      );
    }
  }
  return options;
};

const ExecutiveSummary = () => {
  const [selectYear, setSelectYear] = useState<string>(String(currentYear));

  const { isLoading, data, refetch } = useExecutiveSummary(
    {
      year: '2021',
      half: '2',
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [selectYear]);

  const handleSelectChange = useCallback(
    (value) => {
      setSelectYear(value.value);
    },
    [setSelectYear],
  );

  return (
    <PageLayout headerName={'Executive Summary'} crumbs={getCrumbs()}>
      <ContentContainer>
        <SingleSelect
          options={selectOption()}
          onChange={handleSelectChange}
          defaultValue={selectOption()[0]}
        />

        <Button
          css={css`
            place-content: end;
          `}
        >
          {' '}
          화면 다운로드
        </Button>
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <TableContainer>
              <MarketShareTable data={data?.marketShareSummary || {}} />
            </TableContainer>
            <div>출처</div>
          </>
        )}
      </ContentContainer>
    </PageLayout>
  );
};
export default ExecutiveSummary;
