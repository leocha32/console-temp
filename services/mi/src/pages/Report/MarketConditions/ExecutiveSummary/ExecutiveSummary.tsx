import React, { useEffect, useState, useCallback, useRef } from 'react';
import { PageLayout, Spinner } from 'mi-ui';
import dayjs from 'dayjs';
import { getCrumbs } from '$utils/utils';
import styled from '@emotion/styled';
import MarketShareTable from './components/MarketShareTable';
import BrandAwarenessTable from './components/BrandAwarenessTable';
import SalesVolumeTable from './components/SalesVolumeTable';
import { useExecutiveSummary } from '$modules/report';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { HalfYear } from '$constants/enum';

const TableContainer = styled.div`
  display: grid;
  max-height: 70vh;
  overflow-y: auto;
  grid-gap: 20px;
`;
const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 10px;
  justify-content: space-between;
  position: relative;
`;
const Footer = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  padding: ;
  grid-row: 2/3;
  grid-column: 1/3;
`;

const TITLE = 'Executive Summary';
const currentMonth = dayjs().month();
const currentYear = dayjs().year();

const selectOption = () => {
  const lastYear = 2020;
  const options: { value: string; label: string }[] = [];

  for (let i = currentYear; i >= lastYear; i--) {
    if (currentMonth < 6 && i === currentYear) continue;
    if (i === currentYear) {
      options.push(
        ...[{ value: `${String(i)}-${HalfYear.First}`, label: `${i}년 상반기` }],
      );
    } else {
      options.push(
        ...[
          { value: `${String(i)}-${HalfYear.First}`, label: `${i}년 상반기` },
          { value: `${String(i)}-${HalfYear.Second}`, label: `${i}년 하반기` },
        ],
      );
    }
  }
  return options;
};
const ExecutiveSummary = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectYear, setSelectYear] = useState<string>(selectOption()[0]?.value);
  const [year, half] = selectYear.split('-');

  const { data, isLoading, refetch } = useExecutiveSummary(
    {
      year: year,
      half: half as HalfYear,
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
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        hiddenReportButton={true}
        selectYear={selectYear}
        selectOptions={selectOption()}
        onChangeSelect={handleSelectChange}
        element={contentRef.current as HTMLElement}
        title={TITLE}
      />
      <ContentsWrap>
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer id={'table-container'}>
            <MarketShareTable {...data?.marketShareSummary} />
            <SalesVolumeTable {...data?.salesVolumeSummary} />
            <BrandAwarenessTable {...data?.brandAwarenessSummary} />
          </TableContainer>
        )}
        <Footer>
          [출처]
          <br />
          1) 시장 점유율 조사 : 매년 상 · 하반기 조사, 전국(제주 제외), 만 25~59세 여성
          가구 패널 (가구주 or 가구주 부인), 통계청 가구 정보 근거하여 6개 변인 할당
          (지역/연령/도시 규모/가구소득/가구 규모/자녀 연령)
          <br /> n=5000명 온라인 조사
          <br />
          2) 시판 판매량(POS) : 오프라인(양판점, 백화점, 할인점), 온라인(인터넷 종합몰,
          오픈마켓, 소셜커머스, TV홈쇼핑) 채널 판매량 및 매출액 데이터
          <br />
          3) 매년 상·하반기 조사, 서울, 경기/인천 및 4대 광역시 거주, 25-59남 여성, 통계청
          가구 정보 근거 가구주 연령, 가구원수, 가구 소득 할당, n=1600명, 온라인 조사
        </Footer>
      </ContentsWrap>
    </PageLayout>
  );
};
export default ExecutiveSummary;
