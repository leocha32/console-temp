import React, { useEffect, useCallback, useRef } from 'react';
import { PageLayout, Spinner } from 'mi-ui';
import dayjs from 'dayjs';
import { getCrumbs } from '$utils/utils';
import { useRecoilState } from 'recoil';
import MarketShareTable from './components/MarketShareTable';
import BrandAwarenessTable from './components/BrandAwarenessTable';
import SalesVolumeTable from './components/SalesVolumeTable';
import { useExecutiveSummary } from '$modules/report/research';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { HalfYear } from '$constants/enum';
import { Section, Footer } from '$pages/Report/commonStyled';
import { researchSummary } from '$recoils/filter';

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
  const [filter, setFilter] = useRecoilState(researchSummary);
  const { yyyyh } = filter;
  const contentRef = useRef<HTMLDivElement>(null);
  const [year, half] = yyyyh.split('-');
  const { data, isFetching, refetch } = useExecutiveSummary(
    {
      year: year,
      half: half as HalfYear,
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [yyyyh]);

  const handleSelectChange = useCallback(
    (value) => {
      setFilter({
        yyyyh: value,
      });
    },
    [setFilter],
  );
  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        hiddenReportButton={true}
        selectYear={yyyyh}
        selectOptions={selectOption()}
        onChangeSelect={handleSelectChange}
        element={contentRef.current as HTMLElement}
        title={TITLE}
      />
      <Section>
        {isFetching ? <Spinner /> : null}
        <MarketShareTable data={data?.marketShareSummary} />
        <SalesVolumeTable data={data?.salesVolumeSummary} />
        <BrandAwarenessTable data={data?.brandAwarenessSummary} />
      </Section>
      <Footer>
        [출처]
        <br />
        1) 시장 점유율 조사 : 매년 상 · 하반기 조사, 전국(제주 제외), 만 25~59세 여성 가구
        패널 (가구주 or 가구주 부인), 통계청 가구 정보 근거하여 6개 변인 할당
        (지역/연령/도시 규모/가구소득/가구 규모/자녀 연령) n=5000명 온라인 조사
        <br />
        2) 시판 판매량(POS) : 오프라인(양판점, 백화점, 할인점), 온라인(인터넷 종합몰,
        오픈마켓, 소셜커머스, TV홈쇼핑) 채널 판매량 및 매출액 데이터
        <br />
        3) 매년 상·하반기 조사, 서울, 경기/인천 및 4대 광역시 거주, 25-59남 여성, 통계청
        가구 정보 근거 가구주 연령, 가구원수, 가구 소득 할당, n=1600명, 온라인 조사
      </Footer>
    </PageLayout>
  );
};
export default ExecutiveSummary;
